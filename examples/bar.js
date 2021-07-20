const body = document.querySelector('body');
const p = document.createElement('p');
p.innerText = 'hello';
body.append(p);

fetch('/iWill404', { headers: { 'Accept': 'application/json' } });

fetch('/posts', { headers: { 'Accept': 'application/json' } });

fetch('/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
  .then(response => response.json())
  .then(json => console.log(json));
