# DEMO IUT

## Variables d'environnement

- ./service/.env

## Commandes utiles

- Installer les dépendances

`docker-compose run <nom-du-service> npm i`

- Entrer dans le container : 

`docker exec -ti <nom-du-service> bash`

- Consulter l'API (changer le port selon si on execute la commande sur l'ordinateur ou dans le container)

`curl -i localhost:3333`

- port 3333 : Prise de commande 

- port 3334 : Suivi de commande

- port 3335 : Auth