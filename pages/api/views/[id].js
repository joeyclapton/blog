// ponytail: view counts aren't wired to a real analytics source yet (previous
// integration used a defunct Universal Analytics property). Stubbed at 0 until
// a GA4 Data API integration replaces it.
export default async function getViews(req, res) {
  res.status(200).json({ views: 0 })
}
