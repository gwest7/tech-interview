const input = document.getElementById('q');
const status = document.getElementById('status');
const results = document.getElementById('results');

input.addEventListener('input', async () => {
  const q = input.value;
  status.textContent = 'Searching...';
  try {
    const res = await fetch(`/api/search?q=${q}`);
    const items = await res.json();
    results.innerHTML = items.map((item) => `<li>${item.replace(q, `<b>${q}</b>`)}</li>`).join('');
    status.textContent = '';
  } catch {
    results.innerHTML = '';
  }
});
