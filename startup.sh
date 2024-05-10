cd OneOnOne_backend/
python3 -m venv venv
source venv/bin/activate

python -m pip install django
python -m pip install djangorestframework
python -m pip install djangorestframework-simplejwt
python -m pip install django-cors-headers


python manage.py makemigrations
python manage.py migrate

cd ../OneOnOne_frontend
sudo apt install npm
npm install react react-dom
npm install react-scripts
npm install axios
npm install react-calendar
npm install react-icons
npm install bootstrap


deactivate

