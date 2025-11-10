FROM node:24-alpine3.22

WORKDIR /app

COPY ./package.json /app/package.json

RUN corepack enable pnpm

RUN apk add fish

RUN mkdir -p /root/.config/fish/functions/ &&  printf 'function fish_prompt  \n\
  set -l last_status $status  \n\
    set -l stat  \n\
    if test $last_status -ne 0  \n\
        set stat (set_color red)" [$last_status]"(set_color normal)  \n\
    end  \n\
    string join "" -- (set_color green) "[frontend] " $PWD (set_color normal) $stat " >"  \n\
end' > /root/.config/fish/functions/fish_prompt.fish 
                    
RUN pnpm i

CMD ["pnpm", "dev"]