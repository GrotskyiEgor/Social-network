<div align="center">

<br>
<img src='README_static/images/logo.svg' height=125>
<br>
<br>

<h1>Social network</h1>

<div align="center">

<a href="https://github.com/yourname/questy">
  <span style="font-size: 18px;"><b>Перегляньте документи »</b></span>
</a>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <a href="https://github.com/yourname/questy">
    <span style="font-size: 18px;"><b>View the documents »</b></span>
  </a>
</details>
<br>

</div>

<h3>Соціальна мережа створена на Django, за допомогою веб-сокетів.</h3>

<p style="font-size: 16px;"> 
    Вебзастосунок для соціальної мережі, яка дозволить опрацювати такі модулі як Django, асинхронні фреймворки. Закріплення отриманих знань під час навчання на третьому курсі, та здобування знань у сфері веб-розробки.
</p>

<p style="font-size: 14px;"> 
    Гроцький Егор - https://github.com/GrotskyiEgor
    Денис Аверкін https://github.com/denaverkin
    Щурик Давид https://github.com/ShchurikDavid
    Федотов Микита https://github.com/FedotovNikita993
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <h3>Social network built on Django, using web sockets.</h3>
  
  <p style="font-size: 16px;"> 
      A web application for a social network that will allow you to work with modules such as Django, asynchronous frameworks. Consolidation of knowledge gained during third-year studies and gaining knowledge in the field of web development.
  </p>

  <p style="font-size: 14px;"> 
    Гроцький Егор - https://github.com/GrotskyiEgor
    Денис Аверкін https://github.com/denaverkin
    Щурик Давид https://github.com/ShchurikDavid
    Федотов Микита https://github.com/FedotovNikita993
</p>
</details>
<br>

</div>

<!--  -->
<div align="center">
    <img src='README_static/gifs/home.png' width=1000>
</div>

<h1 id="top">Навігація</h1>

<ul style="font-size: 18px; line-height: 1.9;">
  
  <li>📁 <a href="#project-structur">Структура проєкту</a></li>
  <li>🧠 <a href="#all-modules">Модулі проєкту</a></li>
  <li>🖥️ <a href="#download-project">Розгортання проєкту</a></li>

  <li>
    🔧 <a href="#create-venv">Створення віртуального оточення</a>
    <ul>
      <li><a href="#windows">Для Windows</a></li>
      <li><a href="#mac-os">Для Mac OS</a></li>
    </ul>
  </li>

  <li>
    🛠️ <a href="#download-modules">Встановлення залежностей</a>
  </li>

  <li>🚀 <a href="#start-project">Старт проєкту</a></li>
  <li>
  ⚙️ <a href="#base-mechanics">Опис платформи</a>
   <ul style="font-size: 16px; line-height: 1.6;">   
   <li>
    <a href="#user-app">User app</a>
   </li>
   
   <li>
    <a href="#home-app">Home app</a>
   </li>
   
   <li>
    <a href="#post-app">Post app</a>
   </li>
   
   <li>
    <a href="#profile-app">Profile app</a>
   </li>

   <li>
    <a href="#chat-app">Chat app</a>
   </li>

   <li>
    <a href="#settings-app">Settings app</a>
   </li>
  </ul>

  <li>🎯 <a href="#result">Висновок</a></li>
</ul>

<h1 id="top">Navigation</h1>
<details>
<summary style="font-size: 18px; font-weight: bold;">English translation</summary>

<ul style="font-size: 18px; line-height: 1.9;">
  <li>📁 <a href="#project-structur-eng">Project Structure</a></li>
  <li>🧠 <a href="#all-modules-eng">Project Modules</a></li>
  <li>🖥️ <a href="#download-project-eng">Project Deployment</a></li>

  <li>
    🔧 <a href="#create-venv-eng">Creating a Virtual Environment</a>
    <ul>
      <li><a href="#windows-eng">For Windows</a></li>
      <li><a href="#mac-os-eng">For Mac OS</a></li>
    </ul>
  </li>

  <li>🛠️ <a href="#download-modules-eng">Installing Dependencies</a></li>
  <li>🚀 <a href="#start-project-eng">Project Start</a></li>

  ⚙️ <a href="#base-mechanics">Опис платформи</a>
   <ul style="font-size: 16px; line-height: 1.6;">   
   <li>
    <a href="#user-app">User app</a>
   </li>
   
   <li>
    <a href="#home-app">Home app</a>
   </li>
   
   <li>
    <a href="#post-app">Post app</a>
   </li>
   
   <li>
    <a href="#profile-app">Profile app</a>
   </li>

   <li>
    <a href="#chat-app">Chat app</a>
   </li>

   <li>
    <a href="#settings-app">Settings app</a>
   </li>
  </ul>

  <li>🎯 <a href="#result-eng">Conclusion</a></li>
</ul>
</details>
<br>

<div align="right">
  <a href="#top">⬆ До початку сторінки</a>
</div>
<hr>

<!--  -->
<details>
<summary style="font-size: 2em; font-weight: bold;">Структура проєкту</summary>

```mermaid
flowchart LR
    NETWORK["SOCIAL-NETWORK"]
    NETWORK --> social_network["social_network"]
    NETWORK --> C[".env"]
    NETWORK --> D[".gitignore"]
    NETWORK --> E["README.md"]
    NETWORK --> F["requeirements.txt"]
    social_network --> media["media"]
    social_network --> chat_app["chat_app"]
    social_network --> home_app["home_app"]
    social_network --> post_app["post_app"]
    social_network --> profile_app["profile_app"]
    social_network --> settings_app["settings_app"]
    social_network --> social_network["social_network"]
    social_network --> user_app["user_app"]
    social_network --> static["static"]
    social_network --> templates["templates"]
    media --> M1["media"]
    M1 --> M2["chats_app"]
    M2 --> M3["message_image"]
    M1 --> M4["profile_app"]
    M4 --> M5["avatars"]
    M4 --> M6["signatures"]
    chat_app --> C1["services"]
    chat_app --> C2["static"]
    chat_app --> C3["templates"]
    chat_app --> C4["consumers.py"]
    chat_app --> C5["models.py"]
    chat_app --> C6["urls.py"]
    chat_app --> C7["views.py"]
    C1 --> CC1["add_group_page.py"]
    C1 --> CC2["load_msg.py"]
    C2 --> CC3["css"]
    C2 --> CC4["images"]
    C2 --> CC5["js"]
    home_app --> H2["static"]
    home_app --> H3["templates"]
    home_app --> H5["models.py"]
    home_app --> H6["forms.py"]
    home_app --> H7["urls.py"]
    home_app --> H8["views.py"]
    H2 --> HH3["css"]
    H2 --> HH4["images"]
    H2 --> HH5["js"]
    post_app --> P2["static"]
    post_app --> P3["templates"]
    post_app --> P5["models.py"]
    post_app --> P6["forms.py"]
    post_app --> P7["urls.py"]
    post_app --> P8["views.py"]
    P2 --> PP3["css"]
    P2 --> PP4["images"]
    P2 --> PP5["js"]
    profile_app --> PA2["static"]
    profile_app --> PA3["templates"]
    profile_app --> PA5["models.py"]
    profile_app --> PA6["forms.py"]
    profile_app --> PA6["urls.py"]
    profile_app --> PA7["views.py"]
    profile_app --> PA8["services"]
    PA2 --> PPA3["css"]
    PA2 --> PPA4["images"]
    PA2 --> PPA5["js"]
    PA8 --> PPA4["freind_action.py"]
    PA8 --> PPA5["freind_qureist.py"]
    settings_app --> SS2["static"]
    settings_app --> SS3["templates"]
    settings_app --> SS5["models.py"]
    settings_app --> SS6["forms.py"]
    settings_app --> SS6["urls.py"]
    settings_app --> SS7["views.py"]
    settings_app --> SS8["services"]
    SS2 --> PPA3["css"]
    SS2 --> PPA4["images"]
    SS2 --> PPA5["js"]
    user_app --> UA2["static"]
    user_app --> UA3["templates"]
    user_app --> UA1["forms"]
    user_app --> UA5["models.py"]
    user_app --> UA6["urls.py"]
    user_app --> UA7["views.py"]
    user_app --> UA8["services"]
    UA1 --> UAS3["confirm_email_form.py"]
    UA1 --> UAS4["login_form.py"]
    UA1 --> UAS4["registration_form.py"]
    UA2 --> UAS3["css"]
    UA2 --> UAS4["images"]
    UA2 --> UAS5["js"]
    UA8 --> UAS6["auth_service.py"]
    UA8 --> UAS7["email_service.py"]
    social_network --> SSN2["asgi.py"]
    social_network --> SSN3["consumers.py"]
    social_network --> SSN5["modecontext_processors.py"]
    social_network --> SSN6["routing.py"]
    social_network --> SSN6["settings.py"]
    social_network --> SSN7["urls.py"]
    social_network --> SSN8["wsgi.py"]
    static --> MSS6["css"]
    static --> MSS6["fonts"]
    static --> MSS7["images"]
    static --> MSS8["js"]
    templates --> MT1["base.html"]
```
</details>
<br>

<div align="right">
  <a href="#top">⬆ До початку сторінки</a>
</div>
<hr>

<!--  -->
<h1 id="all-modules">Модулі проєкту</h1>
<!-- Давид -->
<p style="text-align: justify; line-height: 1.8;">
  <a href="https://www.djangoproject.com/" style="font-size: 20px;">Django</a>
  <span style="font-size: 16px;"> - безкоштовний веб-фреймворк на мові Python, створений для швидкої, простої та безпечної розробки складних сайтів і вебдодатків.</span>
  <br>
  
  <a href="https://channels.readthedocs.io/en/latest/" style="font-size: 20px;">Django Channels</a>
  <span style="font-size: 16px;"> - дозволяє створювати асинхронні та довготривалі з'єднання, такі як WebSockets, чат-протоколи або фонові завдання.</span>
  <br>
  
  <a href="https://github.com/django/daphne/" style="font-size: 20px;">Daphne</a>
  <span style="font-size: 16px;"> - це асинхронний вебсервер для Django.</span>
  <br>
  
  <a href="https://twisted.org/" style="font-size: 20px;">Twisted</a>
  <span style="font-size: 16px;"> - фреймворк на Python для створення швидких мережевих програм.</span>
  <br>
  
  <a href="https://cloudinary.com/" style="font-size: 20px;">Cloudinary</a>
  <span style="font-size: 16px;"> - хмарний сервіс для фото та відео.</span>
  <br>
  
  <a href="https://pypi.org/project/pillow/" style="font-size: 20px;">Pillow</a>
  <span style="font-size: 16px;"> - найпопулярніша бібліотека мови Python для обробки зображень.</span>
</p>

<h1 id="all-modules-eng">Project Modules</h1>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; line-height: 1.8;">
  <a href="https://www.djangoproject.com/" style="font-size: 20px;">Django</a>
  <span style="font-size: 16px;"> - a free web framework in Python, created for fast, simple and secure development of complex sites and web applications.</span>
  <br>
  
  <a href="https://channels.readthedocs.io/en/latest/" style="font-size: 20px;">Django Channels</a>
  <span style="font-size: 16px;"> - allows you to create asynchronous and long-lived connections such as WebSockets, chat protocols or background tasks.</span>
  <br>
  
  <a href="https://github.com/django/daphne/" style="font-size: 20px;">Daphne</a>
  <span style="font-size: 16px;"> - an asynchronous web server for Django.</span>
  <br>
  
  <a href="https://twisted.org/" style="font-size: 20px;">Twisted</a>
  <span style="font-size: 16px;"> - a Python framework for creating fast network programs.</span>
  <br>
  
  <a href="https://cloudinary.com/" style="font-size: 20px;">Cloudinary</a>
  <span style="font-size: 16px;"> - cloud service for photos and videos.</span>
  <br>
  
  <a href="https://pypi.org/project/pillow/" style="font-size: 20px;">Pillow</a>
  <span style="font-size: 16px;"> - the most popular Python library for image processing.</span>
</p>
</details>
<br>

<hr>
<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>



<!--  -->
<h1 id="download-project">Розгортання проєкту</h1>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Для завантаження проєкту виконайте наступні кроки:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
    <li>
        Перейдіть на головну сторінку репозиторію на GitHub і натисніть кнопку <b>Code</b>.
    </li>
    <li>
        Скопіюйте HTTPS посилання для клонування репозиторію.
    </li>
</ol>

<h1 id="download-project-eng">Project Deployment</h1>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      To download the project, follow these steps:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
      <li>
          Go to the main page of the repository on GitHub and click the <b>Code</b> button.
      </li>
      <li>
          Copy the HTTPS link to clone the repository.
      </li>
  </ol>
</details>
<br>

<div align="center">
    <img src='README_static/gifs/project_deployment/github_code.gif' width=1000>
</div>

<hr>
<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Після цього виконайте наступні кроки:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
 <li>
  Відкрийте будь-яку IDE, наприклад Visual Studio Code.
  Якщо IDE не встановлена, завантажте її за посиланням
 <a href="https://code.visualstudio.com/">Visual Studio Code</a>.
 </li>
 <li>
  Переконайтесь, що у вас встановлений Git для клонування проєктів:
 <a href="https://git-scm.com/">завантажити Git</a>.
 </li>
 <li>
  У верхній панелі IDE відкрийте <b>Terminal</b> і оберіть <b>New Terminal</b>.
 </li>
 <li>
  У терміналі виконайте команду <b>git clone</b> та вставте скопійоване HTTPS посилання.
 </li>
</ol>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    After that, follow these steps:
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
   <li>
    Open any IDE, for example, Visual Studio Code.
    If the IDE is not installed, download it from
   <a href="https://code.visualstudio.com/">Visual Studio Code</a>.
   </li>
   <li>
    Make sure Git is installed on your system to clone projects:
   <a href="https://git-scm.com/">download Git</a>.
   </li>
   <li>
    In the IDE top menu, open the <b>Terminal</b> and select <b>New Terminal</b>.
   </li>
   <li>
    In the terminal, run the <b>git clone</b> command and paste the copied HTTPS link.
   </li>
  
  </ol>
</details>
<br>

<div align="center">
    <img src="README_static/gifs/project_deployment/git_clone.gif" width="1000">
</div>

<hr>
<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>



<!--  -->
<h1 id="open-project">Відкриття склонованого проєкту</h1>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Після клонування репозиторію виконайте наступні кроки:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
  <li>
      Запустіть Visual Studio Code або іншу IDE.
  </li>
  
  <li>
      У головному меню оберіть <b>File → Open Folder</b>.
  </li>
  
  <li>
      Виберіть папку зі склонованим проєктом.
  </li>
  
  <li>
      Підтвердіть відкриття проєкту.
  </li>
</ol>


<h1 id="open-project">Opening the Cloned Project</h1>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    After cloning the repository, follow these steps:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
   <li>
    Launch Visual Studio Code or another IDE.
   </li>
   
   <li>
    In the main menu, select <b>File → Open Folder</b>.
   </li>
   
   <li>
    Choose the folder containing the cloned project.
   </li>
   
   <li>
    Confirm opening the project.
   </li>
  </ol>
</details>
<br>

<div align="center">
    <img src="README_static/gifs/project_deployment/open_project.gif" width="1000">
</div>

<hr>

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>



<!--  -->
<h1 id="create-venv">Створення віртуального оточення</h1>

<h3 id="windows">Для Windows</h3>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Виконайте наступні кроки для створення та запуску віртуального оточення:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
  <li>
      Створіть віртуальне оточення командою <b>python -m venv venv</b>.
  </li>
  <li>
      Активуйте його командою <b>venv\Scripts\activate</b>.
  </li>
</ol>

<h1 id="create-venv-eng">Creating a Virtual Environment</h1>

<h3 id="windows-eng">For Windows</h3>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      Follow these steps to create and activate a virtual environment:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
    <li>
        Create a virtual environment using the command <b>python -m venv venv</b>.
    </li>
    <li>
        Activate it using the command <b>venv\Scripts\activate</b>.
    </li>
  </ol>
</details>
<br>

<div align="center">
    <img src="README_static/gifs/project_deployment/venv_windows.gif" width="1000">
</div>
<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<hr>

<h3 id="mac-os">Для Mac OS</h3>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Виконайте наступні кроки для створення та запуску віртуального оточення:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
  <li>
      Створіть віртуальне оточення командою <b>python3 -m venv venv</b>.
  </li>
  <li>
      Активуйте його командою <b>source venv/bin/activate</b>.
  </li>
</ol>

<h3 id="mac-os-eng">For Mac OS</h3>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      Follow these steps to create and activate a virtual environment:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
    <li>
        Create a virtual environment using the command <b>python3 -m venv venv</b>.
    </li>
    <li>
        Activate it using the command <b>source venv/bin/activate</b>.
    </li>
  </ol>
</details>
<br>

<hr>

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>



<!--  -->
<h1 id="download-modules">Встановлення залежностей</h1>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Для встановлення всіх необхідних бібліотек проєкту використовується файл requirements.txt.
    Виконайте наступні кроки:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
  <li>
      Відкрийте термінал у віртуальному оточенні.
  </li>
  
  <li>
      Виконайте команду встановлення залежностей:
      <b>pip install -r requirements.txt</b>
  </li>
  
  <li>
      Дочекайтесь завершення встановлення бібліотек.
      Це може зайняти до 1 хвилини залежно від швидкості інтернету.
  </li>
</ol>

<h1 id="download-modules-eng">Installing Dependencies</h1>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      To install all the required project libraries, the <code>requirements.txt</code> file is used.
      Follow these steps:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
   <li>
       Open a terminal in the virtual environment.
   </li>
   
   <li>
       Run the command to install dependencies:
       <b>pip install -r requirements.txt</b>
   </li>
   
   <li>
       Wait for the libraries to finish installing.
       This may take up to 1 minute depending on your internet speed.
   </li>
  </ol>
</details>
<br>

<div align="center">
    <img src="README_static/gifs/project_deployment/pip_install.gif" width="1000">
</div>

<hr>

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>



<!--  -->
<h1 id="start-project">Старт проєкту</h1>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Щоб запустити проєкт, виконайте наступні кроки:
</p>

<ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
  <li>
      Відкрийте файл <b>manage.py</b> у вашій IDE.
  </li>
  
  <li>
      У правому верхньому куті натисніть кнопку запуску
      <b>Run Python File</b> (іконка трикутника ▶).
  </li>
  
  <li>
      Дочекайтесь запуску сервера.
  </li>
</ol>

<h1 id="start-project-eng">Starting the Project</h1>
<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      To start the project, follow these steps:
  </p>
  
  <ol style="font-size: 18px; line-height: 1.8; padding-left: 40px;">
   <li>
       Open the <b>manage.py</b> file in your IDE.
   </li>
   
   <li>
       In the top-right corner, click the <b>Run Python File</b> button (triangle ▶ icon).
   </li>
   
   <li>
       Wait for the server to start.
   </li>
  </ol>
</details>
<br>

<div align="center">
    <img src="README_static/gifs/project_deployment/run_project.gif" width="1000">
</div>

<hr>

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>


<!--  -->
<h1 id="base-mechanics">Опис платформи</h1>

<h2 id="user-app">User app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    одаток призначений для роботи з користувачами платформи. Вся логіка — реєстрація, авторизація та підтвердження пароля — реалізована на одній сторінці. Зміна Django-форм відбувається за допомогою JavaScript.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    RegistrationView використовується для реалізації логіки реєстрації нових користувачів на платформі.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    The application is designed to work with platform users. All logic, including registration, authorization, and password confirmation, is implemented on a single page. Switching between Django forms is handled using JavaScript.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    RegistrationView is used to implement the registration logic for new users on the platform.
</p>
</details>
<br>

```python
class RegistrationView(CreateView):
    model = User
    form_class = RegistrationForm
    success_url = reverse_lazy('home')

    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            user_data = form.cleaned_data
            save_registration(request=request, cleaned_data=user_data)
            request.session['first_registration'] = user_data['email']
            
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False, 'error': form.errors}, status=400)
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Після реєстрації підтвердження пароля відбувається за допомогою ConfirmEmaiView (представлень).
</p>

```python
class ConfirmEmaiView(View):
    model = User
    form_class = ConfirmEmail
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
            user_data = form.cleaned_data
            user = confirm_email(request=request, cleaned_data=user_data)

            if not user:
                return JsonResponse({
                    'success': False, 
                    'error': {
                        'confirm_code': ['Неправильний код']
                    }
                }, status=400)

            return JsonResponse({'success': True})

        return JsonResponse({'success': False, 'error': form.errors}, status=400)
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Безпечну авторизацію (вхід в акаунт), вихід із системи, керування сесіями та правами доступу користувачів на платформі.
</p>

```python
class LoginPageView(LoginView):
    form_class = LoginForm

    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            print('form', form, form.user)
            login(request, form.user)
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False, 'error': form.errors}, status=400)
        

class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return redirect('home')
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<h2 id="home-app">Home app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Додаток призначений для роботи з головною сторінкою. Відповідає за відображення чужих постів та створення своїх, відображення перші 3 запити та перших 3 чатів з повідомленнями ще можна переходити на користувачів які створили пост.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    В ньому можна передивлятися пости інших людей.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    The application is designed to work with the main page.
    </p>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    You can preview other people's posts on it
    </p>    
</details>

```python
def render_to_response(self, context, **response_kwargs):
    if self.request.headers.get("X-Requested-With") == "XMLHttpRequest": 
        page_obj = context['page_obj']
        posts = context['posts']

        for post in posts:
            post.toggleInteract('views', self.request.user)
        
        return JsonResponse({
            'posts_html': render_to_string(
                'post_app/download_parts/post_list.html',
                {"posts": posts}      
            ),
            'has_next': page_obj.has_next()
        })
        
    return super().render_to_response(context, **response_kwargs)
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<h2 id="post-app">Post app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
Додаток призначений для роботи з постами, створення та їx відобрження також створення власних тегів для постів.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
Створення постів відбувається через асинхронні AJAX-запити та JSON.
</p>

<details>
<summary style="font-style: italic; font-size: 14px;">English translation</summary>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
The application is designed to work with posts, create and display posts.
</p>
<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Post creation occurs via asynchronous AJAX requests and JSON.
</p>
</details>

```python
class PostCreateView(LoginRequiredMixin, View):
    login_url = reverse_lazy('auth')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs() 

        if self.request.method == "POST":
            kwargs['links'] = self.request.POST.getlist('links')
            kwargs['images'] = self.request.FILES.getlist('images')

        return kwargs
        
    def post(self, request, *args, **kwargs):
        form = PostForm(
            request.POST, 
            request.FILES,
            links=self.request.POST.getlist('links'),
            images=request.FILES.getlist('images')
        )

        print('form.is_valid()', form.is_valid())
        if form.is_valid():
            post = form.save(author=self.request.user)

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена',
                'post_html': render_to_string('post_app/download_parts/post_list.html', context={"posts": [post]})
            })
        
        print(form.errors)
        print(form.non_field_errors())
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Відображення постів.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      Displaying posts.
  </p>
</details>

```python
class PostView(LoginRequiredMixin, ListView):
    model = Post
    template_name = 'post_app/post.html'
    paginate_by = 5
    context_object_name = 'posts'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context['tag_form'] = TagForm()
        context['post_form'] = PostForm()
        context['tags'] = unionTagList()
        
        return context
    
    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get("X-Requested-With") == "XMLHttpRequest": 
            page_obj = context['page_obj']
            
            return JsonResponse({
                'posts_html': render_to_string(
                    'post_app/download_parts/post_list.html',
                    {"posts": context['posts']}      
                ),
                'has_next': page_obj.has_next()
            })
            
        return super().render_to_response(context, **response_kwargs)
    
    def get_queryset(self):   
        return (
            Post.objects.filter(author=self.request.user).
            select_related('author').
            prefetch_related('tags', 'links', 'images').
            order_by('-id')
        )
```

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Створення власних тегів.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      Create own tags.
  </p>
</details>

```python
class TagCreateView(LoginRequiredMixin, View):
    login_url = reverse_lazy('auth')

    def post(self, request, *args, **kwargs):
        form = TagForm(request.POST)

        if form.is_valid():
            tag = form.save()

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена',
                'tag_html': render_to_string('post_app/download_parts/post_form_tag.html', context={'tag': tag})
            })
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<h2 id="profile-app">Profile app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Додаток відповідає за відображення та керування профілем конкретного користувача, а також за отримання і відображення списку його друзів, рекомендацій та запитів у друзі.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Ця частина керує відображенням особистої інформації користувача, його аватара та статусу.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    The application is responsible for displaying and managing a specific user's profile, as well as retrieving and showing their friends list, friend recommendations, and friend requests.
  </p>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      This module manages the display of the user's personal info, avatar, and status, and handles the logic for user interactions and rendering the friends list.
  </p>
</details>

```python
class ProfileView(LoginRequiredMixin, ListView):
    template_name = 'profile_app/profile.html'
    form_class = PostForm
    paginate_by = 6
    context_object_name = 'posts'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('auth')
        
        if not User.objects.filter(id=self.kwargs.get('user_id')).exists():
            raise PermissionDenied

        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        first_registration = self.request.session.get('first_registration')
        if first_registration != None and first_registration != '':
            first_registration = True

        context['first_registration'] = first_registration
        context['modal_form'] = self.form_class
        context['select_user'] = User.objects.filter(id=self.kwargs.get('user_id')).first()
        context['action'] = self.kwargs.get('action')

        for post in context['posts']:
            post.toggleInteract('views', self.request.user)
        
        return context
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
                
            return JsonResponse({
                'success': True
            })
            
        return JsonResponse({  
            'success': False, 
            'error': form.errors
        }, status=400)
        

    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get("X-Requested-With") == "XMLHttpRequest": 
            page_obj = context['page_obj']
            posts = context['posts']

            for post in posts:
                post.toggleInteract('views', self.request.user)
            
            return JsonResponse({
                'posts_html': render_to_string(
                    'post_app/download_parts/post_list.html',
                    {"posts": posts}      
                ),
                'has_next': page_obj.has_next()
            })
            
        return super().render_to_response(context, **response_kwargs)
    
    def get_queryset(self):   
        return (
            Post.objects.filter(author=User.objects.filter(id=self.kwargs.get('user_id')).first()).
            select_related('author').
            prefetch_related('tags', 'links', 'images').
            order_by('-id')
        )
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Відповідає за логіку взаємодії та виведення списку друзів; також відображаються люди, які не є вашими друзями, а просто рекомендовані вам, та надіслані вам запити у друзі.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>
  
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      Responsible for interaction logic and rendering the friends list; it also displays people who are not your friends but are recommended to you, as well as incoming friend requests.
  </p>
</details>

```python
class AllFriendsView(LoginRequiredMixin, TemplateView):
    template_name = 'friends_app/friend.html'
    login_url = reverse_lazy('auth')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

class FriendsAction(LoginRequiredMixin, TemplateView):
    def post(self, request, action, profile_id, *args, **kwargs):
        other_user_profile = User.objects.get(id=profile_id)

        if action == 'accept':
            result = accept_friend_request(request.user, other_user_profile)

            return JsonResponse(result)
        elif action == 'request':
            result = add_friend_request(request.user, other_user_profile)

            return JsonResponse(result)
        elif action == 'delete_frienship':
            result = delete_friendship(request.user, other_user_profile)

            return JsonResponse(result)
        elif action == 'dismissed':
            result = dismiss_recommendation(request.user, other_user_profile)

            return JsonResponse(result)
        
        return JsonResponse({'success': False})


    
class FriendsSelectionView(LoginRequiredMixin, View):
    def get(self, request, selection, *args, **kwargs ):
        limit = int(request.GET.get('limit', 0))
        filter_input = request.GET.get('filter_text', '')
        user = [] 
        html = ''

        if selection == 'requests':
            user = get_friendship_requests(request.user, filter_input)
        elif selection == 'recommendations':
            user = get_friendship_recommendation(request.user, filter_input)
        elif selection == 'friend':
            user = get_friends(request.user, filter_input)

        page_obj = Paginator(user, limit if limit else 6).get_page(request.GET.get('page', 1))

        if (page_obj.number == int(request.GET.get('page', 1))):
            html = render_to_string( 
                f"friends_app/particals/{selection}.html",
                {selection: page_obj.object_list},
                request=request
            )
        
        return JsonResponse({"html": html, "has_next_page": page_obj.has_next()})

```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<h2 id="chat-app">Chat app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Цей додаток відповідає за спілкування, створення приватних та групових чатів, можна відправляти різні типи повідомлень такі як - текстові повідомлення та повідомлень із зображенням.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    У приватних чатах із друзями ви можете обмінюватися текстовими повідомленнями, а також ділитися зображеннями в режимі реального часу.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    This application is responsible for communication, creating private and group chats, and allows sending various types of messages, such as text messages and messages with images.
  </p>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    In private chats with friends, you can exchange text messages and seamlessly share images in real time.
  </p>
</details>

```js
async function openChatWithUser(userId, username) {
    const response = await fetch(`/chats/chat_with/${userId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
    });

    const data = await response.json();
    if (data.success) {
        if (data.chats_html.trim() !== ''){
            chatsSentinel.insertAdjacentHTML("beforebegin", data.chats_html)
            let chatsContainer = document.getElementById('chats_container')

            chatsContainer.scrollTo({
                top: chatsContainer.scrollHeight,
                behavior: 'smooth'
            });
        }

        $(emptyChatContainer).remove()
        connectWebSocket(data.chat_id);
    }
}

async function send_message(){
    const formIntput = document.getElementById('message_form_input')
    const messageImagesInput = document.getElementById('message_images_input')
    inputMessage = formIntput.value.trim()
    hasImages = getSelectImages().length > 0

    if (!inputMessage && !hasImages) return;

    if (hasImages) {
        const data = await sendMessageWithImages(inputMessage);
        
        if (!data.success) return;

        formIntput.value = '';
        messageImagesInput.value = ""; 
    }


    if (!hasImages){
        chatSocket.send(JSON.stringify({ messageText: inputMessage }));
        formIntput.value = ''
    }
}

async function sendMessageWithImages(text) {
    const selectChatId = getCookie('chatId')
    const formData = new FormData();
    formData.append("text", text);
    
    getSelectImages().forEach((image) => {
        formData.append("images", image);
    });

    const response = await fetch(`/chats/upload_images/${selectChatId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: formData,
    });

    return response.json();
}
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    У приватних чатах із друзями ви можете обмінюватися текстовими повідомленнями, а також ділитися зображеннями в режимі реального часу.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      You can create private chats with friends.
  </p>
</details>

```python
class ChatWithView(LoginRequiredMixin, View):
    login_url = reverse_lazy("auth")


    def post(self, request, user_id, *args, **kwargs):
        add_new_user = False
        current_user = request.user
        other_user = User.objects.get(id = user_id)

        friends = get_friends(current_user)

        if other_user not in friends:
            return JsonResponse({"success": False}, status=403)
        
        user_chat_ids = Chat.objects.filter(users=current_user, is_group=False).values_list("id", flat=True)
        chat = Chat.objects.filter(id__in = user_chat_ids, users=other_user, is_group=False).first()

        if chat is None:
            add_new_user = True
            chat = Chat.objects.create(is_group=False)
            chat.users.add(current_user, other_user)
        
        return JsonResponse({
            "success": True, 
            'chats_html': render_to_string(
                    'chat_app/particals/chats.html',
                    {"chats": [chat if add_new_user else []], 'user': self.request.user}      
                ),
            "chat_id": chat.id
        })  
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Можна створювати групи з друзями.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      You can create groups with friends.
  </p>
</details>

```python
def create_group(request):
    file = request.FILES.get('file')
    name = request.POST.get("name", "").strip()
    user_ids = request.POST.getlist("users")

    if not name:
        return JsonResponse({'success': False, "error": "name_required"}, status=400)
    
    if len(user_ids) <= 1:
        return JsonResponse({'success': False, "error": "add_users"}, status=400)
    
    friend_ids = get_friends(request.user).filter(id__in=user_ids).values_list("id", flat=True)
    chat = Chat.objects.create(name=name, is_group=True, admin=request.user)
    chat.avatar = 'profiles/avatars/chat_img.svg'
    chat.users.add(request.user)
    chat.users.add(*User.objects.filter(id__in=friend_ids))

    return JsonResponse({'success': True, 'chat_id': chat.id, "name": chat.name, 'chat_html':  render_to_string(
                        'chat_app/particals/groups.html',
                        {"groups": [chat]}      
                    ),})
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Можна редагувати групи.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
      You can create groups with friends.
  </p>
</details>

```python
def edit_create_group(request, chat_id):
    name = request.POST.get("name", "").strip()
    user_ids = request.POST.getlist("users")

    if not name:
        return JsonResponse({'success': False, "error": "name_required"}, status=400)
    
    if len(user_ids) <= 1:
        return JsonResponse({'success': False, "error": "add_users"}, status=400)
    
    friend_ids = get_friends(request.user).filter(id__in=user_ids).values_list("id", flat=True)
    chat = get_object_or_404(Chat, id=chat_id)

    chat.name = name
    chat.users.clear()
    chat.users.add(request.user)
    chat.users.add(*User.objects.filter(id__in=friend_ids))

    chat.save()

    other_user = chat.users.exclude(id=request.user.id).first()
    messages = chat.messages.all().order_by('-created_at')[:20]
    messages = reversed(messages)
    chat_messages = get_msg_list(messages)
        
    return JsonResponse({'success': True, 'chat_id': chat.id, "name": chat.name, 'group_html':  render_to_string(
        'chat_app/particals/chat_messages.html',
        {'chat': chat, 'chat_users': chat.users.all(), 'other_user': other_user, 'chat_messages': chat_messages, 'user': request.user})     
    })
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<h2 id="settings-app">Settings app</h2>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Цей додаток відповідає за налаштування та зміни даних акаунта, аватарки, імені, псевдоніма, пароля та розпису.
</p>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Зміна стандартних даних.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    This add-on is for setting up and changing your account data, avatar, name, nickname, password and signature.
  </p>
  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Changing default data.
  </p>
</details>

```python
class SettingsSaveView(View):
    def post(self, request, action, *args, **kwargs):
        user = request.user
        profile = user.profile

        if action == 'pictire_set':
            print('pictire_set', user)

            avatar = request.FILES.get('avatar')

            if (avatar):
                profile.avatar = avatar

            user.username = clean_username(request.POST.get('username', user.username), user)

            user.save()
            profile.save()

            return JsonResponse({'success': True, 'username': user.username, 'avatar_url': profile.avatar.url })

        elif action == 'base_set':
            user.email = request.POST.get('email', user.email)
            print('last_name', request.POST.get('last_name', 'Прізвище'))
            profile.pseudonym = request.POST.get('pseudonym', user.profile.pseudonym)

            birth_date = request.POST.get('birth_date')
            if birth_date:
                profile.birth_date = birth_date

            user.save()
            profile.save()

            return JsonResponse({'success': True, 'pseudonym': profile.pseudonym, 'birth_date': profile.birth_date, 'email': user.email }) 
        elif action == 'password_set':
            my_password = request.POST.get('my_password')
            new_password = request.POST.get('new_password')
            check_password = request.POST.get('check_password')

            if not new_password or not check_password or not my_password:
                return JsonResponse({'success': False}, status=400) 
            
            if new_password != check_password:
                return JsonResponse({'success': False}, status=400) 
            
            if request.user.check_password(my_password):
                user.set_password(new_password)
                user.save()

                update_session_auth_hash(request, user)

                return JsonResponse({'success': True}) 
        elif action == 'sing_set':
            avatar = request.POST.get('avatar') == 'true'
            signature = request.POST.get('signature') == 'true'

            print(avatar, signature, 'signature')
            profile.is_text_signature = avatar
            profile.is_image_signature = signature
            profile.save()

            return JsonResponse({'success': True}) 
            
        return JsonResponse({'success': False}, status=400) 
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Створення розпису.
</p>

<details>
  <summary style="font-style: italic; font-size: 14px;">English translation</summary>
  <br>

  <p style="text-align: justify; font-size: 18px; line-height: 1.7;">
    Creating a mural.
  </p>
</details>

```python
class SettingsSaveSignView(View):
    def post(self, request, *args, **kwargs):
        user = request.user
        profile = user.profile

        try:
            data = json.loads(request.body)
            image_data = data.get('image')

            if not image_data:
                return JsonResponse({
                    'success': False,
                    'error': 'No image provided'
                }, status=400)

            format_part, imgstr = image_data.split(';base64,')
            ext = format_part.split('/')[-1]

            file_name = f"signature_{uuid.uuid4()}.{ext}"

            decoded_file = base64.b64decode(imgstr)

            profile.signature.save(
                file_name,
                ContentFile(decoded_file),
                save=True
            )

            profile.is_image_signature = True
            profile.save()

            return JsonResponse({
                'success': True,
                'signature_url': profile.signature.url
            })

        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
```

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<hr>

<h1 id="result">Висновок</h1>

<div align="right">
    <a href="#top">⬆ До початку сторінки</a>
</div>
<br>

<hr>