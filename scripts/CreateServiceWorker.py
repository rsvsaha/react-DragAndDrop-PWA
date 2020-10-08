import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
# print(dir_path)
parent = os.path.abspath(os.path.join(dir_path, os.pardir))

publishing_project_directory = os.path.join(parent,"app-publish-framework","build")
file_names = []


for root, dirs, files in os.walk(publishing_project_directory, topdown = False):
   
   for name in files:
      filename = os.path.join(root, name)
      filename = "'/"+filename.split("\\build\\")[1].replace("\\","/")+"'"
      file_names.append(filename)
#    for name in dirs:
#       print(os.path.join(root, name))



file_names = ",\n".join(file_names)
# print(type(file_names))
data = ""
with open("sw.js","rt") as file:
    data = file.read()
    data = data.replace('STATICFILENAMES',file_names)
file.close()



with open(os.path.join(publishing_project_directory,"sw.js"),"wt") as file:
    # print(data)
    file.write(data)
file.close()



