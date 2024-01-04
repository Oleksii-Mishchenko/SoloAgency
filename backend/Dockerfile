# Use the official Python image as a base image
FROM --platform=linux/amd64 python:3.10.9-slim-buster

# Set metadata for the image
LABEL maintainer="savik1992@gmail.com"

# Set the working directory to /app
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Upgrade pip and install requirements
RUN pip install --upgrade pip
COPY backend/requirements.txt backend/requirements.txt
RUN pip install -r backend/requirements.txt

# Create necessary directories
RUN mkdir -p /vol/web/media/uploads/

# Add a non-root user and set file permissions
RUN adduser \
    --disabled-password \
    --no-create-home \
    --gecos '' \
    django-user

RUN chown -R django-user:django-user /vol/
RUN chmod -R 755 /vol/web/

# Switch to the non-root user
USER django-user
