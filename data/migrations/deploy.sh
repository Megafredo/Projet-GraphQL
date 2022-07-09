#* Export variables d'environnements
export PGUSER=oresto
# Ici faut mettre le mot de passe choisi 
#lors de l'initialisation avec init.sh
export PGPASSWORD=oresto

#* Deploy Global :
sqitch deploy -d oresto oresto_v1
# sqitch deploy -d oresto oresto_v2