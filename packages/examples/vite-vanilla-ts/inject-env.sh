find ./dist -type f -exec sed -i '' 's/__VITE_RUNTIME_CONFIG__/'{"VITE_NAME":\"Alice\"}'/g' {} \;
