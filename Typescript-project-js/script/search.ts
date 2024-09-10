import { getSearch } from "../apis/services/search.service";  
import { errorHandler } from "../libs/error-handler";  
import { renderResults } from "../components/search-failed";  
  
const input = document.getElementById('text-search') as HTMLInputElement;  
const container = document.getElementById('p-Elemnet') as HTMLElement;  
const paginationContainer = document.getElementById('pagination') as HTMLElement;   
let currentPage = 1;  
const itemsPerPage = 10;  
let debounceTimer: NodeJS.Timeout;  
  
async function Search() {  
   input.addEventListener("input", function (event) {  
      clearTimeout(debounceTimer);  
      debounceTimer = setTimeout(async () => {  
         currentPage = 1;  
         await fetchResults();  
      }, 100);  
   });  
}  

async function fetchResults() {  
    try {  
       let find = String(input.value).toUpperCase();  
       const response = await getSearch(currentPage, find);  
       const { data, total } = response;  
        
     
       if (data.length === 0) {  
          renderResults(input.value);  
       } else {  
          displayResults(data);  
          setupPagination(total); 
       }  
    } catch (error) {  
       errorHandler(error);  
    }  
 }   
  
async function displayResults(data: any[]) {  
   try {  
      const div = document.getElementById('noResult');
      const render = document.getElementById('div-render-container') as HTMLElement;  
      if (div) {  
        div.remove();  
      } 
      render.style.display = "block";   
      const container = document.getElementById('p-Elemnet') as HTMLElement;  
      container.innerHTML = '';  
 
      data.forEach((product) => {  
         const productHTML = `  
         <div class="flex flex-col mt-4" data-id="${product.id}">  
            <img src="${product.imageURL}" alt="${product.name}">  
            <p class="text-lg font-bold mt-2">${truncateName(product.name)}</p>  
            <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
         </div>  
         `;  
         container.innerHTML += productHTML;  
      });  

      const productElements = container.children;  
      Array.from(productElements).forEach(element => {  
         element.addEventListener('click', () => {  
            const productId = element.getAttribute('data-id');  
            redirectToDetails(productId);  
         });  
      });  

      if (productElements.length === 0) {  
         container.innerHTML = 'No more products to display';  
      }  
   } catch (error) {  
      errorHandler(error);  
   }  
}   

function redirectToDetails(id: string | null) {  
    if (id) {  
        window.location.href = `/product-details.html?id=${id}`;  
    }  
}  

function setupPagination(totalItems: number) {  
    const totalPages = Math.ceil(totalItems / itemsPerPage);  
    paginationContainer.innerHTML = '';  

    for (let i = 1; i <= totalPages; i++) {  
        const pageButton = document.createElement('button');  
        pageButton.innerText = i.toString();  
        pageButton.classList.add('pagination-button');  
        pageButton.style.padding = '8px 16px';  
        pageButton.style.marginLeft = '16px';  
        pageButton.style.border = '1px solid black';  
        pageButton.style.backgroundColor = (i === currentPage) ? 'black' : 'white';  
        pageButton.style.color = (i === currentPage) ? 'white' : 'black';  

        pageButton.addEventListener('click', async () => {  
            currentPage = i;  
            await fetchResults();   
            updateButtonStyles(i);  
        });  
        paginationContainer.appendChild(pageButton);  
    }  
}  

function updateButtonStyles(selectedPage: number) {  
    const buttons = paginationContainer.getElementsByClassName('pagination-button');  
    for (let button of buttons) {  
        const htmlButton = button as HTMLElement; 
        if (parseInt(htmlButton.innerText) === selectedPage) {  
            htmlButton.style.backgroundColor = 'black';  
            htmlButton.style.color = 'white';  
        } else {  
            htmlButton.style.backgroundColor = 'white';  
            htmlButton.style.color = 'black';  
        }  
    }  
}  

function truncateName(name: string): string {  
   return name.split(' ').length > 2 ? name.split(' ').slice(0, 2).join(' ') + '...' : name;  
}  

Search();  