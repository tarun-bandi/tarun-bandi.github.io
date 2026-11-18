import './portfolio.css'

type Chart = {
  file: string
  title: string
  summary: string
  sources?: { label: string; url: string }[]
}

const charts: Chart[] = [
  {
    file: 'saints_historical_rushing.png',
    title: 'How low is 187 yards?',
    summary: 'From 1999 to 2025, only three NFL team-seasons had a leading rusher below 187 yards through nine games.',
    sources: [
      { label: 'nflverse', url: 'https://nflreadr.nflverse.com/reference/load_player_stats.html' },
      { label: 'Saints stats', url: 'https://www.neworleanssaints.com/team/stats/2026/REG' },
    ],
  },
  {
    file: 'nfl_leading_rushers_2026.png',
    title: 'Every NFL team’s leading rusher',
    summary: 'All 32 NFL teams ranked by their leading rusher’s yards through November 15, 2026.',
    sources: [
      { label: 'NFL Week 10 statistics', url: 'https://static.clubs.nfl.com/image/upload/saints/tgee1alkvkqkpq1q3y7p.pdf' },
    ],
  },
  {
    file: 'nfl_qb_experience.png',
    title: 'NFL quarterback experience',
    summary: 'Years of NFL experience for the 32 quarterbacks in the Week 5 QB Index, including the 2026 season.',
    sources: [
      { label: 'NFL Week 5 QB Index', url: 'https://www.nfl.com/news/nfl-qb-rankings-week-5-2026-nfl-season' },
    ],
  },
  {
    file: 'steelers-defense-depth-chart.webp',
    title: 'Steelers Defense 2026 Depth Chart',
    summary: 'An unofficial lineup concept showing a base 3–4 defense and a nickel package. An illustration, with roster details unverified.',
  },
  {
    file: 'steelers-defense-harder-together.webp',
    title: 'Steelers Defense: Harder Together',
    summary: 'An unofficial poster imagining Pittsburgh’s 2026 defensive starters and reserves. An illustration, with roster and stat details unverified.',
  },
]

export default function App() {
  return (
    <main className="chart-gallery">
      <header className="gallery-heading">
        <p>Tarun Bandi</p>
        <h1>Sports Charts</h1>
      </header>

      <div className="gallery-grid">
        {charts.map((chart) => {
          const url = `${import.meta.env.BASE_URL}charts/${chart.file}`

          return (
            <article className="gallery-card" key={chart.file}>
              <a className="gallery-preview" href={url} aria-label={`View full chart: ${chart.title}`}>
                <img src={url} alt="" />
              </a>
              <div className="gallery-copy">
                <h2><a href={url}>{chart.title} <span aria-hidden="true">↗</span></a></h2>
                <p>{chart.summary}</p>
                {chart.sources && (
                  <ul className="gallery-sources" aria-label="Sources">
                    {chart.sources.map((source) => (
                      <li key={source.url}><a href={source.url}>{source.label} ↗</a></li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
