var update = document.getElementById('update');

update.addEventListener('click', () => {
	fetch('quotes', {
  		method: 'put',
  		headers: {'Content-Type': 'application/json'},
 	    body: JSON.stringify({
   			 'name': 'David Eliason',
   			 'quote': 'I need more coffee'
   })
 }).then(res => {
 	if (res.ok) return res.json()
 }).then(data => {
 	console.log(data);
 	window.location.reload(true);
 })
})