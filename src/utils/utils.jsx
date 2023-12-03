export function generateRandomId() {
    const idLength = 5; 
    
    let randomId = '';
    for (let i = 0; i < idLength; i++) {
      const digit = Math.floor(Math.random() * 10);  
      randomId += digit;
    }
    
    return parseInt(randomId, 10); 
  }
  