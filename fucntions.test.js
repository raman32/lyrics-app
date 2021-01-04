const { getSongLyricsAsync, getSongsListFromLinkAsync, getSongListAsync } = require('./functions.js');

test('Testing Get Song List From Sugest API', () => {
    getSongLyricsAsync("coldplay").then(data=> { return expect.toBeDefined(data);} )
    getSongLyricsAsync("coldplay").then(data=> { return expect.toBeDefined(data.json());} )
  });

  test('Testing Get Song List From Sugest API', () => {
    getSongsListFromLinkAsync("https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?limit=15&q=Mafia&index=30").then(data=> { return expect.toBeDefined(data);} )
    getSongsListFromLinkAsync("https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?limit=15&q=Mafia&index=30").then(data=> { return expect.toBeDefined(data.json());} )
  });

  test('Testing Get Song List From Sugest API', () => {
    getSongLyricsAsync("https://api.lyrics.ovh/v1/coldplay/Paradise").then(data=> { return expect.toBeDefined(data);} )
    getSongLyricsAsync("https://api.lyrics.ovh/v1/coldplay/Paradise").then(data=> { return expect.toBeDefined(data.json());} )
  });
