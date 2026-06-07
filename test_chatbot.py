import urllib.request
import json
import time

queries = [
    'Apa itu Growth Ops Hub?',
    'Bagaimana cara menggunakan platform?',
    'Fitur apa saja yang tersedia?'
]

for i, q in enumerate(queries):
    data = json.dumps({'query': q}).encode()
    req = urllib.request.Request(
        'http://127.0.0.1:8001/api/chat',
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        start = time.time()
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.loads(response.read().decode())
            elapsed = time.time() - start
            print(f'OK Query {i+1} ({elapsed:.1f}s): {result["response"][:80]}')
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        print(f'ERROR Query {i+1}: {error_msg[:150]}')
    except Exception as e:
        print(f'ERROR Query {i+1}: {str(e)[:150]}')
    
    time.sleep(1)

print('\nLogs stored in backend/logs/')
