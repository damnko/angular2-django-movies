# Uncomment the following lines if you want the script to set up your virtualenv for you:
# virtualenv env
# source virtualenv/bin/activate

# Install python dependencies
pip install -r python-requirements.txt

# Install Angular 2 dependencies
cd ./angular2-client
yarn install