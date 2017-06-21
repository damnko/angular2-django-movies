from django.core.exceptions import ValidationError
import re

def validate_password(password):
    print('validating passowrd', password)
    if len(password) < 8:
        print('pass is short')
        raise ValidationError('Password should be longer than 8 chars')
        # return TypeError('Password should be longer than 8 chars')
    elif re.search('[A-Z]', password) is None:
        print('pass is not short')
        raise ValidationError('Password should have at least one capital letter')
    elif re.search('^[a-z0-9A-Z]+$', password) is not None:
        print('pass has no special chars')
        raise ValidationError('Password should contain at least one special char')

def validate_email(email):
    if re.search(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email) is None:
        raise ValidationError('Email is not valid')