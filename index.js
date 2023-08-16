const axios = require('axios')

let gptgo = (q) => {
 let reqHead = {
	 headers: {
	  'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1811) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.40 Mobile Safari/537.36'
  }
 }
 let baseUrl = 'https:/\/gptgo.ai'
 return new Promise((res,rej)=>{
  axios.get(`${baseUrl}/action_get_token.php?q=${q}&hlgpt=en&hl=en`,reqHead).then(r=>{
   axios.get(`${baseUrl}/action_ai_gpt.php?token=${r.data.token}`,reqHead).then(R=>{
  	  let arr = R.data.match(/"content":"(.*?)"/g).splice(1)
  	  arr.pop()
   	 res(arr.join().match(/:"(.*?)"/g).map(e=>e.replace(/[:"]/g,'')).join(''))
   	}).catch(e=>rej(e.response.data))
  }).catch(e=>rej(e.response.data))
 })
}
(async()=>{
  console.log(await gptgo("hi"))
})()