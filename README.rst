chatapp project

===============

this is a chat application built using django, django channels and react.
For now, there's nothing new compared to other chat apps, this is a fun project to learn how chat apps are implemented.

this project was generated using `fork of a cookiecutter <https://github.com/chopdgd/cookiecutter-django-reactjs>`_

implementation details are:

- Backend
    * login/signup was implemented with DRF and `with django rest knox <github.com/James1345/django-rest-knox>`_
    * using websockets on frontend, channels on backend for full duplex communication
    * using redis channel layer so that the communication is more dynamic
- Frontend
    * the UI was built using `bulma <https://bulma.io>`_ CSS framework, `tailwind <https://tailwindcss.com>`_ utility css, `bloomer <https://bloomer.js.org>`_
    * on frontend using `react-router` for client side navigation, `redux` for single state source, `axios` for making `HTTP` calls


Features:
    * logged in users can join/create a chat room they want
    * users can send message to the room

Work In Progress:
    * users can see who is online/offline
