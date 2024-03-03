# urlshortener
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
### A very very simple URL shortener inspired from `<System Design Interview>`

### Appearances
![1](./readme_pic/1.png)
![2](./readme_pic/2.png)

### Mechanism
1. Do SHA256 hash URL
2. Encode hashed URL to BASE62 encoding
3. Cut the first 10 characters. The duplication probability is **1/62^10** = 1/839,299,365,868,340,224. The url will be like `W99EdQi0CY`
4. Save that to the database and return the shortened URL to the user after appending the site domain like `knig.ht/W99EdQi0CY`. (Refer to `.env` file.)

It's a very simple and rough implementation, I just built it in only 3 hours. Of course, not for real production!