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
      autoplay: false,
      order: 'list',
      loop: 'all',
      preload: 'auto',
      mutex: true,
      lrcType: 0,
      volume: 0.7,
      listFolded: true,
      listMaxHeight: '340px',
      audio: list
    })

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

  const remountPlayer = () => {
    const container = document.getElementById(PLAYER_ID)
    if (!container) return

    if (window.globalFixedAPlayer && typeof window.globalFixedAPlayer.destroy === 'function') {
      window.globalFixedAPlayer.destroy()
      window.globalFixedAPlayer = null
    }

    container.innerHTML = ''
    container.dataset.aplayerMounted = '0'
    waitForAPlayer()
  }

  if (document.readyState === 'complete') {
    waitForAPlayer()
  } else {
    window.addEventListener('load', waitForAPlayer, { once: true })
  }

  document.addEventListener('pjax:complete', remountPlayer)
})()
