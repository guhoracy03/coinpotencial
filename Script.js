//Declarações variaveis
const coinListURL= "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"




//funções
    //função receber Api da Coingecko!
 const getCoinPrice =  () => {
     axios.get(coinListURL)
    .then(response =>{
        const data = response.data
        //Lista moedas recebidas pelo response
        for (i in data) {
            //Criar duas <div> container para os dois inputs de moedas
            let coinDropDownMenuItem = document.createElement("div");
            let coinDropDownMenuItem2 = document.createElement("div");
            //adicionar classe para as divs criadas
            coinDropDownMenuItem.classList ="dropDownMenuItem";
            coinDropDownMenuItem2.classList ="dropDownMenuItem2";
            
            //adiciona evento para as divs chamando função "coinSelect" enviando posição do array por parametro
            coinDropDownMenuItem.setAttribute('onMouseDown',`coinSelectInput(${[i]},1)`)
            coinDropDownMenuItem2.setAttribute('onMouseDown',`coinSelectInput(${[i]},2)`)
           
            let lista = document.querySelector(".listDropDown");
            lista.appendChild(coinDropDownMenuItem);
            
            let lista2 = document.querySelector(".listDropDown2");
            lista2.appendChild(coinDropDownMenuItem2);
             //Criar elemento tag's <img> que será os logo das moedas no input
            let addCoinLogo = document.createElement("img");
            addCoinLogo.setAttribute('src', data[i].image);
     
            let addCoinLogo2 = document.createElement("img");
            addCoinLogo2.setAttribute('src', data[i].image);
            
            //criar elemnto tag's <p> que serão as siglas(symbol) das moedas no input
             let addCoinSymbol = document.createElement("p");
             addCoinSymbol.innerHTML = data[i].symbol;
             addCoinSymbol.classList ="coinSymbol";
         
            let addCoinSymbol2 = document.createElement("p");
             addCoinSymbol2.innerHTML = data[i].symbol;
             addCoinSymbol2.classList ="coinSymbol";
            
            //criar elemento tag's <p> que serão os nomes das moedas do input
            let addCoinName = document.createElement("p");
            addCoinName.innerHTML = data[i].name;
            addCoinName.classList ="coinName";
            addCoinName.setAttribute("id",`item-${i}`)

            let addCoinName2 = document.createElement("p");
            addCoinName2.innerHTML = data[i].name;
            addCoinName2.classList ="coinName";
           // addCoinName2.setAttribute("id",`itemInput2-${i}`)
            
            //atribuir logo, sigla(symbol) e nome da moeda para a <div> coinContainer gerada no começo da função//
            coinDropDownMenuItem.appendChild(addCoinLogo);
            coinDropDownMenuItem2.appendChild(addCoinLogo2);
            coinDropDownMenuItem.appendChild(addCoinSymbol);
            coinDropDownMenuItem2.appendChild(addCoinSymbol2);
            coinDropDownMenuItem.appendChild(addCoinName);
            coinDropDownMenuItem2.appendChild(addCoinName2);
        

        }
        
    }).then( ()=> {
       
        //função para buscar moedas no primeiro input
       
        const filterElement = document.querySelector("#inputNameCurrency")
        const coinDivs = document.querySelectorAll(".dropDownMenuItem")
    
        filterElement.addEventListener("input", filterCoins)

        function filterCoins() {
            if(filterElement.value != "") {
                
                for (let coinDiv of coinDivs) {

                    let coinTitle = coinDiv.querySelector(".coinName")
                    
                    coinTitle = coinTitle.textContent.toLowerCase()
        
                    let filterText = filterElement.value.toLowerCase()

                    if(!coinTitle.includes(filterText)){
                        coinDiv.style.display = "none"

                    }else{
                        coinDiv.style.display = "block"
                    }
                }
            }else{

                for(let coindiv of coinDivs){
                    coindiv.style.display = "block"
                }
            }
        }
    }

    ).then( () =>{
          //função para buscar moedas no segundo input
        const filterElement = document.querySelector("#inputNameCurrency2")
        const coinDivs = document.querySelectorAll(".dropDownMenuItem2")

        filterElement.addEventListener("input", filterCoins)
        
        function filterCoins() {
            if(filterElement.value != "") {
                
                for (let coinDiv of coinDivs) {

                    let coinTitle = coinDiv.querySelector(".coinName")
                    
                    coinTitle = coinTitle.textContent.toLowerCase()
        
                    let filterText = filterElement.value.toLowerCase()

                    if(!coinTitle.includes(filterText)){
                        coinDiv.style.display = "none"

                    }else{
                        coinDiv.style.display = "block"
                    }
                }
            }else{

                for(let coindiv of coinDivs){
                    coindiv.style.display = "block"
                }
            }
        }
    }
    //tratamento de erro em caso de falha no response junto com API     
    ).catch(error =>{console.log(error) })
}
       

//Eventos


//gera uma div com a moeda selecionada
async function coinSelectInput(coin,input) {
   
    await axios.get(coinListURL).then(response =>{
        const coinInfo = response.data
        
        for(i in coinInfo){

            if(input === 1){
                document.getElementById("inputNameCurrency").style.display="none";
                let coinInput = document.querySelector(".inputContent");
                coinInput.style.display="flex"
                    
                let coinImage = coinInfo[coin].image;
                document.querySelector(".inputContent >img").setAttribute('src',coinImage)
        
                let coinPosition = coinInfo[coin].symbol;
                document.querySelector("#coinNameSelected").innerHTML = coinPosition
                
                let coinPrice = coinInfo[coin].current_price;
                document.querySelector("#coinPriceSelected").innerHTML = '$'+coinPrice
               
                let marketCapCoinFirst = coinInfo[coin].market_cap;
                document.querySelector("#marketCapText").innerHTML = marketCapCoinFirst
                
            }else{
                
                document.getElementById("inputNameCurrency"+input).style.display="none";
                let coinInput = document.querySelector(".inputContent"+input);
                coinInput.style.display="flex"
                    
                let coinImage = coinInfo[coin].image;
                document.querySelector(".inputContent"+input+" >img").setAttribute('src',coinImage)
        
                let coinPosition = coinInfo[coin].symbol;
                document.querySelector("#coinNameSelected"+input).innerHTML = coinPosition
                
                let coinPrice = coinInfo[coin].current_price;
                document.querySelector("#coinPriceSelected"+input).innerHTML = '$'+coinPrice
                
                let marketCapCoinSecond = coinInfo[coin].market_cap;
                document.querySelector("#marketCapText2").innerHTML = marketCapCoinSecond
                
            }  
             
        }
        //toLocaleString('en-US',{style:'currency', currency:'USD'})
    function coinCalcResult(){
                let input1CoinSymbol = document.querySelector("#coinNameSelected").innerHTML
                let input2CoinSymbol = document.querySelector("#coinNameSelected2").innerHTML
                let input1CoinImage = document.querySelector(".inputContent >img").getAttribute("src")
                let input1CoinPrice = document.querySelector("#coinPriceSelected").innerHTML
                let input1MktCap = document.querySelector("#marketCapText").innerHTML
                let input2MktCap = document.querySelector("#marketCapText2").innerHTML

        
                if (input1MktCap !="" && input2MktCap !="") {
                    document.querySelector("#coinsCompareDescription").innerHTML = 
                    (input1CoinSymbol.toUpperCase()+" com a capitalização de mercado de "+input2CoinSymbol.toUpperCase()) ;
                    document.querySelector("#CoinCompareImage").setAttribute("src",input1CoinImage)

                    let pricePotencialResult = (parseFloat(input2MktCap) / parseFloat(input1MktCap))*parseFloat(input1CoinPrice.substring(1)) 
                    
                    let percentualResult = ((parseFloat(input2MktCap) / parseFloat(input1MktCap))-1)*100
                    
                    pricePotencialResult = pricePotencialResult.toLocaleString('en-US',{style:'currency', currency:'USD'})
                    document.querySelector("#result").innerHTML = (pricePotencialResult)
                    document.querySelector("#resultPercentual").innerHTML ="("+percentualResult.toFixed(0)+"%)"
                    document.querySelector(".pageDownContainer").style.display="flex";

                    if (percentualResult <0) {
                        document.querySelector("#resultPercentual").innerHTML = document.querySelector("#resultPercentual").innerHTML.fontcolor('red')
                    } else {
                        document.querySelector("#resultPercentual").innerHTML = document.querySelector("#resultPercentual").innerHTML.fontcolor('#65e96b')
                    }

                    } else {
                            
                 }
             }coinCalcResult() 
        
         })
        }


//Remover moeda selecionado do input ao clicar no icone "X"
function removeCoin(e){
    if(e == 1){
        //div com preço some
    document.querySelector(".inputContent").style.display="none"  
        //input para seleção da moeda aparece
    document.getElementById("inputNameCurrency").style.display="block";
        //zera elemnto abaixo para a função coinCalcResult() fazer nova checagem
    document.querySelector("#marketCapText").innerHTML ="";
        //div com resultado final some
    document.querySelector(".pageDownContainer").style.display="none";
    }else{
        //mesma logiça do if, porém para o segundo input de seleção de moeda
    document.querySelector(".inputContent"+e).style.display="none"  
    document.getElementById("inputNameCurrency"+e).style.display="block";
    document.querySelector("#marketCapText"+e).innerHTML ="";
    document.querySelector(".pageDownContainer").style.display="none";
        }
    }



//Efeito exibir e ocultar lista de moedas dropdown do input 1
function MenuDropDownDisplay(p) {
    let e =  document.querySelector(".coinContainer");
    let v = ['block','none']
    e.style.display = v[p];
}
//Efeito exibir e ocultar lista de moedas dropdown do input 2
function MenuDropDownDisplay2(p) {
    let e =  document.querySelector(".coinContainer2");
    let v = ['block','none']
    e.style.display = v[p];
}



getCoinPrice()



