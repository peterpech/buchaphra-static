import os
import json
from bs4 import BeautifulSoup

SAVE_DIR = os.path.join('public', 'assets')


def scrape_products(soup):
    products = []
    items = soup.select('.product-card')
    for it in items:
        title_el = it.select_one('h4')
        desc_el = it.select_one('p')
        img_el = it.select_one('img')
        products.append({
            'title': title_el.get_text(strip=True) if title_el else '',
            'description': desc_el.get_text(strip=True) if desc_el else '',
            'image': img_el['src'] if img_el else ''
        })
    return products


def main():
    html_path = os.path.join('public', 'index.html')
    with open(html_path, encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    data = scrape_products(soup)
    os.makedirs(SAVE_DIR, exist_ok=True)
    save_path = os.path.join(SAVE_DIR, 'products.json')
    with open(save_path, 'w', encoding='utf-8') as j:
        json.dump(data, j, ensure_ascii=False, indent=2)
    print(f'Exported {save_path}')


if __name__ == '__main__':
    main()
