import { getProducts } from "../apis/services/products.service";  
import { getBrands } from "../apis/services/brand.service";  

let currentPage = 1;  
let totalProducts = 0;  
let currentBrand: string[] | null = null;  

async function getBrandHome() {  
    try {  
        const response = await getBrands();  
        const brands = response.brands;  
        if (!brands || !Array.isArray(brands)) {  
            throw new Error("Invalid brands data.");  
        }  
        displayBrands(brands);  
    } catch (error) {  
        console.error("Error fetching brands:", error);  
    }  
}  

(async function() {  
    await getBrandHome();  
})();  


function displayBrands(brandArray: string[]) {  
    const brandList = document.getElementById('brn') as HTMLElement;  
    brandList.innerHTML = '';  

    const allButton = createBrandButton('All', () => {  
        currentBrand = null;  
        fetchProducts(1);  
        updateBrandButtonStyles(allButton);  
    });  
    brandList.appendChild(allButton);  

    brandArray.forEach(brand => {  
        const brandBtn = createBrandButton(brand, () => {  
            currentBrand = [brand];  
            fetchProducts(1);  
            updateBrandButtonStyles(brandBtn);  
        });  
        brandList.appendChild(brandBtn);  
    });  
}  

function createBrandButton(name: string, onClick: () => void): HTMLButtonElement {  
    const button = document.createElement('button');  
    button.textContent = name;  
    button.className = "brand-button";  
    button.addEventListener("click", onClick);  
    return button;  
}  

function updateBrandButtonStyles(selectedButton: HTMLElement) {  
    const buttons = document.querySelectorAll('#brn button');  
    buttons.forEach(button => {  
        if (button === selectedButton) {  
            button.classList.add("selected");  
        } else {  
            button.classList.remove("selected");  
        }  
    });  
}  

async function fetchProducts(page: number) {  
    currentPage = page;  
    try {  
        const response = await getProducts(page, currentBrand);  
        totalProducts = response.total;  
        displayProducts(response.data);  
        setupPagination();  
    } catch (error) {  
        console.error('An error occurred while fetching the products.', error);  
    }  
}  
function displayProducts(products: any[]) {  
    const productDiv = document.getElementById('p-Elemnet') as HTMLElement;  
    productDiv.innerHTML = '';  
    
    products.forEach(product => {  
        const productItem = document.createElement('div');  
        productItem.className = "flex flex-col mt-4";  
        productItem.style.cursor = "pointer";  
        productItem.innerHTML = `  
            <img src="${product.imageURL}" alt="${product.name}">   
            <p class="text-lg font-bold mt-2">${truncateName(product.name)}</p>  
            <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
        `;  
  
        productItem.addEventListener('click', () => redirectToDetails(product.id));  
  
        productDiv.appendChild(productItem);  
    });  
}  

function truncateName(name: string): string {  
    return name.split(' ').length > 2 ? name.split(' ').slice(0, 2).join(' ') + '...' : name;  
}  

function redirectToDetails(id: string) {  
    window.location.href = `/product-details.html?id=${id}`;  
}  

async function setupPagination() {  
  const paginationDiv = document.getElementById("pagination") as HTMLElement;  
  paginationDiv.innerHTML = "";  

  const totalPages = Math.ceil(totalProducts / 10);  

  for (let i = 1; i <= totalPages; i++) {  
      const button = document.createElement("button");  
      button.textContent = i.toString();  
      button.className = "pagination-button";  

      button.addEventListener("click", () => {  
          fetchProducts(i);  
          updatePaginationButtonStyles(button);  
      });  


      if (i === currentPage) {  
          button.classList.add('selected');  
      }  

      paginationDiv.appendChild(button);  
  }  
}  

function updatePaginationButtonStyles(selectedButton: HTMLElement) {  
    const buttons = document.querySelectorAll('#pagination button');  
    buttons.forEach(button => {  
        button.classList.remove('selected');  
    });  
    selectedButton.classList.add('selected');  
}  

(async function getInitialProducts() {  
    await fetchProducts(1);  
})();