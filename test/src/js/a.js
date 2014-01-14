function getId(id) {
	
	if(typeof id !== 'string') {
		
		return id;
		
	} else {
		
		if(id.substring(0, 1) === '#') {
		
			return document.querySelector(id);
			
		} else {
			
			return document.getElementById(id);
			
		}
		
	}
	
}