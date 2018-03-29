import 'whatwg-fetch'

// May add if time: handling of errors can go here

export default {
  get: url => fetch(url).then(res => res.json())
}
