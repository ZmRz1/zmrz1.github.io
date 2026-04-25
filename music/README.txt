Put your audio files in this folder, for example:

- `source/music/song-01.mp3`
- `source/music/song-02.flac`

Then edit `source/js/global-aplayer-playlist.js` with this format:

```js
window.GLOBAL_APLAYER_PLAYLIST = [
  {
    name: 'Song 01',
    artist: 'Artist 01',
    url: '/music/song-01.mp3',
    cover: '/images/123.jpg'
  },
  {
    name: 'Song 02',
    artist: 'Artist 02',
    url: '/music/song-02.flac',
    cover: '/images/123.jpg'
  }
]
```
