const el = document.getElementById('proxy')

async function logJson(path) {
  const res = await fetch(path)
  const json = await res.json()
  console.log("JSON from", path, "is", json)
  el.append(JSON.stringify(json))
}

await logJson('/api/start')
await logJson('/api/finish')
await logJson('/api')
