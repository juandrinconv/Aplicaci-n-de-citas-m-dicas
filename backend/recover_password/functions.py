from django.core.mail import send_mail
import secrets
import string


def random_password_generator():
    caracteres = string.ascii_letters + string.digits
    random_password = ''.join(secrets.choice(caracteres) for _ in range(20))
    return random_password


def send_mail_django(secondary_emails, new_password):
    subject = "Recover password"
    message = f"Your assigned password is: {new_password}"
    principal_email = "juandrinconv@gmail.com"
    send_mail(subject, message, principal_email,
              [secondary_emails], fail_silently=False)
    response = {"response": "email sent"}
    return response
