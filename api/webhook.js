export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Telnyx Forwarder Ready');
  }

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    await fetch('https://xx.zey.kdns.fr/webhook/telnyx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
    return res.status(200).send('OK');
  } catch (err) {
    // 即使转发异常也返回 200，防止 Telnyx 反复重试堵塞队列
    return res.status(200).send('Forward Error: ' + err.message);
  }
}
