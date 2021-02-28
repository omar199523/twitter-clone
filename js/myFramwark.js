const createAndAddElement=(object,parantElement=undefined)=>{
    parantElement?parantElement:parantElement=undefined;
    //this is variable from object
    let {element,innerElement,attribute={},events={}}=object;
    // this is create element 
    let el = document.createElement(element);
    //this set attribute in el element
    for(const [atr,x] of Object.entries(attribute)){
        el.setAttribute(atr,x);
      }
      for(const [event,fun] of Object.entries(events)){
        el.addEventListener(event,fun);
      }
    // this chack of inner Element if string plasce in el if not array set element from Array in el element
    if(Array.isArray(innerElement)){
        el.append(...innerElement);
    }else{
        el.innerText = innerElement;
    }
    //this chack of cont is presunt create el in cont if not return el 
    if(parantElement){
        parantElement.appendChild(el);        
    }else{
        return el;
    }
}