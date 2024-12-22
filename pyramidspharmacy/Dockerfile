# Use an official Python runtime as a parent image
FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



# Set environment variables for database connection
ENV DB_NAME ''
ENV DB_USER ''
ENV DB_PASSWORD ''
ENV DB_HOST ''
ENV DB_PORT ''


# Set the working directory
WORKDIR /PyramidsPharmacyBE

# Install dependencies
COPY requirements.txt /PyramidsPharmacyBE/
RUN pip install -r requirements.txt

# Copy the project code into the container
COPY . /PyramidsPharmacyBE/