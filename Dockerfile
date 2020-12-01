FROM nginx:1.19.5
COPY . /app
RUN cd /app
RUN npm run build

EXPOSE 8080

# -p 8080:80
# build/static
# CMD python /app/app.py
# -p 8080:80