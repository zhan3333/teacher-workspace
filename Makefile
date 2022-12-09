remote_dir = /home/zhan/Application/teacher-workspace
remote_ssh = zhan@t
build_api:
	GOOS=linux GOARCH=amd64 go build -o build/teacher-workspace server/cmd/main.go
build_web:
	npm run build:prod
	rm -rf build/web/*
	cp -r dist/* build/web/

upload_api: build_api
	scp build/teacher-workspace ${remote_ssh}:${remote_dir}/
	scp -r build/config ${remote_ssh}:${remote_dir}/
	scp build/Dockerfile ${remote_ssh}:${remote_dir}/
	ssh ${remote_ssh} "cd ~/Application && docker-compose up -d --no-deps --build teacher-workspace"

upload_web: build_web
	ssh ${remote_ssh} "rm -rf ${remote_dir}/web/*"
	scp -r build/web/* ${remote_ssh}:${remote_dir}/web/

upload: upload_web upload_api
