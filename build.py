import os
from supabase import create_client, Client
from jinja2 import Environment, FileSystemLoader
from dotenv import load_dotenv

load_dotenv()

# Intenta obtener las variables desde Vercel (o un .env si existiera)
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Error: Las variables SUPABASE_URL y SUPABASE_KEY no están configuradas.")
    exit(1)

supabase: Client = create_client(url, key)

print("Obteniendo datos de proyectos desde Supabase...")
response = supabase.table('projects').select('*').order('id', desc=True).execute()
projects_data = response.data
print(f"Se encontraron {len(projects_data)} proyectos.")

env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index.html')

print("Renderizando la plantilla HTML...")
html_content = template.render(projects=projects_data)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("¡Éxito! El archivo index.html ha sido generado.")