
import os

file_path = r'c:\Users\walid\Cursor - Projects\UNISPHERE\worker\src\index.ts'

print(f"Reading {file_path}...")
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

trunc_index = -1
for i, line in enumerate(lines):
    if "* Routeur principal" in line:
        print(f"Found target at line {i+1}: {line.strip()}")
        # We want to remove the preceding '/**' line as well if it exists
        if i > 0 and "/**" in lines[i-1]:
            trunc_index = i - 1
            print(f"Truncating from line {trunc_index+1}")
        else:
            trunc_index = i
            print(f"Truncating from line {trunc_index+1}")
        break

if trunc_index != -1:
    new_content = lines[:trunc_index]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_content)
    print("File updated successfully.")
else:
    print("Target string not found in file.")
