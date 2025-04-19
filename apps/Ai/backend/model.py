#!/usr/bin/env python3
"""
model.py -- fast inference for SkillBridge using USE‑lite without tensorflow_text
Reads one JSON payload from stdin, does predict or recommend, prints JSON, exits.
"""
import sys
import json
import numpy as np
import joblib
import tensorflow as tf
import tensorflow_hub as hub
import sentencepiece as spm
from sklearn.neighbors import NearestNeighbors

# Disable eager to use TF1-style hub.Module
tf.compat.v1.disable_eager_execution()

# Load USE‑lite module
module_url = "https://tfhub.dev/google/universal-sentence-encoder-lite/2"
module = hub.Module(module_url)

# Sparse placeholder for inputs
input_ph = tf.compat.v1.sparse_placeholder(tf.int64, shape=[None, None])
encodings = module(inputs=dict(
    values=input_ph.values,
    indices=input_ph.indices,
    dense_shape=input_ph.dense_shape
))

# Initialize SP processor
with tf.compat.v1.Session() as sess:
    sess.run([tf.compat.v1.global_variables_initializer(),
              tf.compat.v1.tables_initializer()])
    spm_path = sess.run(module(signature="spm_path"))
sp = spm.SentencePieceProcessor()
with tf.io.gfile.GFile(spm_path, "rb") as f:
    sp.LoadFromSerializedProto(f.read())


def embed_texts(texts):
    """Convert texts to USE‑lite embeddings."""
    ids = [sp.EncodeAsIds(t) for t in texts]
    maxlen = max(len(seq) for seq in ids)
    values = [v for seq in ids for v in seq]
    indices = [[i, j] for i, seq in enumerate(ids) for j in range(len(seq))]
    dense_shape = (len(ids), maxlen)
    with tf.compat.v1.Session() as sess:
        sess.run([tf.compat.v1.global_variables_initializer(),
                  tf.compat.v1.tables_initializer()])
        out = sess.run(
            encodings,
            feed_dict={
                input_ph.values: values,
                input_ph.indices: indices,
                input_ph.dense_shape: dense_shape
            }
        )
    return np.array(out)

# Load artifacts
model      = tf.keras.models.load_model('skillbridge_model.h5')
mlb        = joblib.load('mlb_classes.joblib')
embeddings = np.load('embeddings.npy')
nn         = joblib.load('nn_model.joblib')
meta       = joblib.load('meta.joblib')
session_ids = meta['session_ids']
df_titles   = meta['titles']
df_tags     = meta['tags']

# Read input
payload = json.loads(sys.stdin.read())
cmd     = payload.get('command', '')
out     = None

if cmd == 'predict':
    title = payload.get('title', '')
    k     = payload.get('top_k', 3)
    emb   = embed_texts([title])
    preds = model.predict(emb)[0]
    topk  = sorted(enumerate(preds), key=lambda x: -x[1])[:k]
    out   = [{'tag': mlb.classes_[i], 'score': float(score)} for i, score in topk]

elif cmd == 'recommend':
    idx       = int(payload.get('session_index', 0))
    n         = payload.get('n', 3)
    distances, indices = nn.kneighbors([embeddings[idx]], n_neighbors=n+1)
    out = []
    for i in indices[0][1:]:
        out.append({
            'session_id': int(session_ids[i]),
            'title':       df_titles[i],
            'tags':        df_tags[i]
        })

else:
    out = {'error': f"Unknown command: {cmd}"}

# Write output
sys.stdout.write(json.dumps(out))
sys.stdout.flush()
sys.exit(0)

