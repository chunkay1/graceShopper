<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/chunkay1/graceShopper">
    <img src="https://media.istockphoto.com/id/1004093210/vector/abstract-vector-landscape-nature-or-outdoor-mountain-view-silhouette.jpg?s=612x612&w=0&k=20&c=cy35M0he0XBLOwYnQcziDICQ3zmtpb_BA8njDLJyYgQ=" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Hike & Seek</h3>

  <p align="center">
    Welcome to our e-commerce shopping experience. This web application functions like many of the sites we use every day like Amazon, eBay, and Etsy.
    <br />
    <!-- <a href="https://github.com/chunkay1/graceShopper/tree/main"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://hike-seek.onrender.com/home">View Demo</a>
    ·
    <!-- <a href="https://github.com/chunkay1/graceShopper/issues">Report Bug</a>
    ·
    <a href="https://github.com/chunkay1/graceShopper/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](HASLandingPage.png)

-	Our site is for outdoor enthusiasts, so we drew inspiration from companies like REI, and the North Face.
-	With Hike & Seek’s web application, you can create an account, search by category and add products to your cart, checkout with them, and even view your past orders.
-	Administrative users can manage inventory by adding products through their own secure portal as well, only accessible with the right credentials.

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Express][Express.js]][Express-url]
* [![PostgreSQL][PostgreSQL.org]][PostgreSQL-url]
* [![Node][Node.js]][Node-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow the steps below. 

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/chunkay1/graceShopper.git
   ```
2. Navigate to the /backend/ folder and run
   ```sh
   npm install
   ```
3. Create a .env file with a JWT_SECRET in the backend folder
4. Make sure postgres is running
   ```sh
   sudo service postgresql start
   ```
5. If it's your first time running our app, create a db called hikeandseek
   ```sh
   CREATE DATABASE hikeandseek;
   ```
6. Seed the database while in the backend folder
   ```sh
   npm run seed:dev
   ```
7. Then, boot up the server while in backend
   ```sh
   npm run start:dev
   ```
8. Navigate to frontend/graceshopper and run
   ```sh
   npm install
   ```
9. While in frontend/graceshopper start react
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Log in and create an account
- [ ] Add products to cart
-     [ ] Delete items from cart
- [ ] Checkout cart
- [ ] Administrator can add items to inventory

<!-- See the [open issues](https://github.com/chunkay1/graceShopper/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact the Team

Fabian Hernandez - fabian.hernandez1713@gmail.com [![LinkedIn][linkedin-shield]][fabian-linkedin-url]
<br>
Sam Banister - email@email_client.com [![LinkedIn][linkedin-shield]][sam-linkedin-url]
<br>
Kendall Hudson - email@email_client.com [![LinkedIn][linkedin-shield]][kendall-linkedin-url]
<br>
Vivienne Chawande - email@email_client.com [![LinkedIn][linkedin-shield]][vivienne-linkedin-url]

Project Link: [https://github.com/chunkay1/graceShopper](https://github.com/chunkay1/graceShopper)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Bootstrap](https://getbootstrap.com/)
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Google Fonts](https://fonts.google.com/)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [Coolors Color Palettes](https://coolors.co/palettes/trending)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chunkay1/graceShopper.svg?style=for-the-badge
[contributors-url]: https://github.com/chunkay1/graceShopper/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chunkay1/graceShopper.svg?style=for-the-badge
[forks-url]: https://github.com/chunkay1/graceShopper/network/members
[stars-shield]: https://img.shields.io/github/stars/chunkay1/graceShopper.svg?style=for-the-badge
[stars-url]: https://github.com/chunkay1/graceShopper/stargazers
[issues-shield]: https://img.shields.io/github/issues/chunkay1/graceShopper.svg?style=for-the-badge
[issues-url]: https://github.com/chunkay1/graceShopper/issues
[license-shield]: https://img.shields.io/github/license/chunkay1/graceShopper.svg?style=for-the-badge
[license-url]: https://github.com/chunkay1/graceShopper/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
<<<<<<< HEAD
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: HASLandingPage.png
=======
[kendall-linkedin-url]: https://www.linkedin.com/in/kendall-b-hudson/
[sam-linkedin-url]: https://www.linkedin.com/in/sam-banister/
[vivienne-linkedin-url]: https://www.linkedin.com/in/viviennechawande/
[fabian-linkedin-url]: https://www.linkedin.com/in/fabian-s-hernandez/
[product-screenshot]: images/screenshot.png
>>>>>>> 15e8a8ec488aba12a7bf9bbcb33603e7eb81474c
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Express-shield]: https://img.shields.io/badge/-Express-black?logo=express&logoColor=white&style=for-the-badge
[Express-url]: https://expressjs.com/
[PostgreSQL-shield]: https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge
[PostgreSQL-url]: https://www.postgresql.org/
[Node-shield]: https://img.shields.io/badge/-NodeJs-339933?logo=node.js&logoColor=white&style=for-the-badge
[Node-url]: https://nodejs.org/en
