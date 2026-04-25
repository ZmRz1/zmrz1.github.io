(() => {
  const PLAYER_ID = 'global-aplayer'

  const initPlayer = () => {
    const container = document.getElementById(PLAYER_ID)
    const list = window.GLOBAL_APLAYER_PLAYLIST

    if (!container || !Array.isArray(list) || list.length === 0) return
    if (container.dataset.aplayerMounted === '1') return
    if (typeof APlayer !== 'function') return

    container.dataset.aplayerMounted = '1'

    const player = new APlayer({
      container,
      fixed: true,
      autoplay: true,
      order: 'list',
      loop: 'all',
      preload: 'auto',
      mutex: true,
      lrcType: 3,
      volume: 0.7,
      listFolded: true,
      listMaxHeight: '340px',
      audio: list
    })

    if (player.audio) player.audio.playbackRate = 1
    if (typeof player.play === 'function') {
      const playPromise = player.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    window.globalFixedAPlayer = player
  }

  const waitForAPlayer = () => {
    let retries = 0
    const timer = setInterval(() => {
      retries += 1
      if (typeof APlayer === 'function') {
        clearInterval(timer)
        initPlayer()
      } else if (retries > 40) {
        clearInterval(timer)
      }
    }, 200)
  }

  if (document.readyState === 'complete') {
    waitForAPlayer()
  } else {
    window.addEventListener('load', waitForAPlayer, { once: true })
  }
})()
