
async function fetchData(filePath) {
    try{
        const response= await fetch(filePath)
        if(!response.ok){
            throw new Error(`Error, status: ${response.status}`);
        }

        const cardsData= await response.json();
        return cardsData;
    }
    catch(error){
        console.error("Faild to fetch data: ", error)
        return [];
    }    
}

let cards=[];
(async()=>{

    const jsonFilePath= '/cardsData.json';
    cards= await fetchData(jsonFilePath);
    const path = window.location.pathname.split('/').pop();
    if(path === 'market.html')
{
    displayCards(cards, true);
}
if(path === 'mydeck.html')
{
    let deck= JSON.parse(localStorage.getItem('card')) || []
    displayCards(deck, false);
}
})();



function displayCards(cardCatalogue=cards, displayButtons=true){
// document.addEventListener('DOMContentLoaded',()=> {
    const cardsContainer= document.querySelector(".card-grid");
    cardsContainer.innerHTML = "";
    cardCatalogue.forEach((card)=>{
        if(card.quantity)
        {
            const cardLayer= document.createElement('div');
            cardLayer.classList.add('shadow-2xl','rounded-xl', 'w-full');
            const RarityLayer= document.createElement('div');
            RarityLayer.classList.add('flex', 'justify-end');
            const Rarity= document.createElement('p');
            Rarity.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-blue-500', 'text-white', 'font-bold', 'text-center', 'text-sm', 'p-1', 'rounded-t-xl', 'w-1/4');
            Rarity.textContent = card.rarity ;
            RarityLayer.append(Rarity);


            const blackLayer= document.createElement('div');
            blackLayer.classList.add('bg-stone-950', 'p-1.5' , 'rounded-b-xl');
            const colorLayer= document.createElement('div');
            colorLayer.classList.add( 'p-3', 'flex', 'flex-col', 'items-center', 'shadow-xl', 'rounded-lg');
            
            if(card.cardType=="monster")
            {
                colorLayer.classList.add('bg-orange-300')
            
            } else if(card.cardType=="effect monster")
            {
                colorLayer.classList.add('bg-orange-600')
            } else if(card.cardType=="fusion")
            {
                colorLayer.classList.add('bg-purple-500')

            } else if(card.cardType=="link")
            {
                colorLayer.classList.add('bg-blue-500')
        
            } else if(card.cardType=="trap")
            {
                colorLayer.classList.add('bg-pink-500')

            } else if(card.cardType=="spell")
            {
                colorLayer.classList.add('bg-emerald-300')
            
            } else if(card.cardType=="synchro")
            {
                colorLayer.classList.add('bg-white')
            }
            
            
            const nameContainer= document.createElement('div');
            nameContainer.classList.add('w-full', 'mb-2', 'flex', 'justify-between', 'items-center', 'text-black');
            const name= document.createElement('p');
            name.classList.add('text-base', 'sm:text-lg', 'font-extrabold', 'truncate');
            name.textContent= card.name;
            const attribute= document.createElement('span');
            
            attribute.classList.add('bg-purple-700', 'text-xs', 'font-semibold', 'px-2', 'py-0.5', 'rounded-full', 'shadow-md');
            attribute.textContent= card.attribute;
            nameContainer.append(name);
            nameContainer.append(attribute);
        
        
            const levelContainer= document.createElement('div');
            levelContainer.className="stars-container w-full space-x-0.5 mb-2";
            for(let i=0; i<card.level; i++)
            {
                const star= document.createElement('span');
                star.className= "bg-orange-500 text-yellow-500 text-xs px-1 py-0.5 rounded-full shadow-lg";
                star.textContent="★";
                levelContainer.append(star);
            }


            const imageContainer= document.createElement('div');
            imageContainer.className="w-full aspect-square bg-gray-900 rounded-md shadow-inner overflow-hidden mb-3";
            const image= document.createElement('img');
            image.src= card.illustration;
            image.alt= card.name;
            image.className="w-full h-full object-cover";
            imageContainer.append(image);
            
            
            const detailsContainer= document.createElement('div');
            detailsContainer.className= "w-full p-2 border-2 border-gray-800 rounded-md shadow-2xl text-gray-800";
            if(card.cardType=="monster")
            {
                detailsContainer.classList.add('bg-orange-300')
            
            } else if(card.cardType=="effect monster")
            {
                detailsContainer.classList.add('bg-orange-300')
            } else if(card.cardType=="fusion")
            {
                detailsContainer.classList.add('bg-purple-300')

            } else if(card.cardType=="link")
            {
                detailsContainer.classList.add('bg-blue-300')
        
            } else if(card.cardType=="trap")
            {
                detailsContainer.classList.add('bg-pink-300')

            } else if(card.cardType=="spell")
            {
                detailsContainer.classList.add('bg-emerald-200')
            }

            const typeConatiner= document.createElement('div');
            typeConatiner.className= "text-xs sm:text-sm font-semibold mb-1";
            const types= document.createElement('p');
            types.textContent= card.type;
            typeConatiner.append(types);
            
            
            
            const description = document.createElement('div');
            description.className= "text-[0.65rem] sm:text-xs leading-snug";
            card.description.forEach((parargraph)=>{
                const para= document.createElement('p');
                para.className="mb-1";
                para.textContent= parargraph;
                description.append(para);
            });


            const atk_def= document.createElement('p');
            atk_def.className="w-full text-right font-bold text-xs sm:text-sm mt-2";
            atk_def.textContent= card.atk_def;
            detailsContainer.append(typeConatiner);
            
            if(card.materials != '')
            {
                const materialConatiner= document.createElement('div');
                materialConatiner.className="text-xs sm:text-sm mb-1";
                const materials= document.createElement('p');
                materials.className= "italic";
                materials.textContent= card.materials;
                materialConatiner.append(materials);
                detailsContainer.append(materialConatiner)
            }

            detailsContainer.append(description);
            detailsContainer.append(atk_def);
        
        
            colorLayer.append(nameContainer);
            colorLayer.append(levelContainer);
            colorLayer.append(imageContainer);
            colorLayer.append(detailsContainer);
            blackLayer.append(colorLayer);
            cardLayer.append(RarityLayer);
            cardLayer.append(blackLayer);

            const fullContainer= document.createElement('div');
            fullContainer.append(cardLayer);

            if(displayButtons){
            
            const card_button = document.createElement('div')
            card_button.className = 'flex justify-between items-center'
            card_button.innerHTML = `
                <button class=" mt-4 ml-4 cursor-pointer" onclick="update_cart(${card.id})">Add To Cart</button>
                <button class=" mt-4 mr-4" onclick="favorite_card(${card.id})">❤️</button>`
            fullContainer.append(card_button);
            }          
            
            cardsContainer.append(fullContainer);
        }
    
    });
// })
}

let deck= JSON.parse(localStorage.getItem('card')) || []
function update_cart( id )
{
    const card=cards.find(element=>element.id===id)
    const exist= deck.find(element=> element.id===id)
    if(!exist)
    {
        deck.push(card);
        localStorage.setItem('card',JSON.stringify(deck))
        alert(`${card.name} added to your deck!`);
    }
    else {alert('the already added')}
    
}

