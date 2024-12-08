" ==============================================================================
"
" VIM配置项目
"
" > 坚持每天一个小进步
" > 访问vim官方网站[https://www.vim.org](https://www.vim.org)学习更多使用技巧.
" > ——学而不思则怠 死而不学则罔,如果哪天觉得VIM影响使用了,就到了该进一步学习时候了
"
"
" 使用方法: vim -u vimrc
"
" # 常用快捷操作：
"
" ## 光标定位
"
" * gd 跳至变量声明处
" * $跳至行尾
" * ^跳至行首
" * 0跳至第一个字符
"
" ## 编辑操作
"
" * d/D 删除至行末
" * U:撤销
" * xp:交换当前字符与下一个字符
" * ctrl + r 重做
" * ==:自动缩紧当前行
"
" ## 页面导航
"
" * 0gt打开第一个标签
"
" ## 其他
"
" gg=G 全文排版
" :copen 编译程序
" :tabnew  open tabpage after the current one
" :+tabnew open tabpage after the next
" :-tabnew open tabpage before current
" :0tabnew open tabpage before first
" :$tabnew open tabpage after last one
"
" ==============================================================================

" ------------------------------------------------------------------------------
" 常规配置
" ------------------------------------------------------------------------------
set nocompatible  " Use Vim defaults instead of 100% vi compatibility
set backspace=2
set title
set ttyfast
set lazyredraw
set noerrorbells
set novisualbell
"set list "显示不可见字符
"set nolist "取消显示不可见字符

" Enable clipboard if possible
if has('clipboard') 
  if has('unnamedplus') " When possible use + register for copy-paste 
    set clipboard=unnamed,unnamedplus 
  else " On mac and Windows, use * register for copy-paste 
    set clipboard=unnamed 
  endif 
endif

" ------------------------------------------------------------------------------
" 颜色 
" ------------------------------------------------------------------------------
"colorscheme default

" ------------------------------------------------------------------------------
" 字符编码设置 "
" ------------------------------------------------------------------------------
set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
set fileencoding=utf-8

" ------------------------------------------------------------------------------
" GUI配置 "
" ------------------------------------------------------------------------------
set wildmenu
set guioptions-=T
set guioptions-=m
set shortmess=atI
set title 
set textwidth=80
"set colorcolumn=+1 " 标注第81列
" 标签页配置
set tabpagemax=12
set showtabline=1

" 状态栏
set ruler " show the cursor position all the time
set statusline=%F[:b%n][%{&ff}]%m%r%h%w%y\ %=\ %-8.(%l,%c%V%)\ %p%%
set laststatus=2
"set nocursorline
set cursorline
"highlight cursorline ctermbg=blue guibg=blue

" ------------------------------------------------------------------------------
" 编辑模式配置 "
" ------------------------------------------------------------------------------
set backupcopy=yes
set viewoptions+=localoptions
set viewdir=$HOME/.vim/view
"set clipboard=umapamed
set number
set showcmd " display incomplete commands
set showmode
set mouse=n " to enable the mouse
set selection=exclusive
set selectmode=mouse,key
set wrap
set linebreak
set formatoptions+=mM
"set scrolloff=5
set magic
set backspace=indent,eol,start
set wildmenu   " vim命令补全
"set spell spelllang=en_us

" ------------------------------------------------------------------------------
" 折叠设置
" 手动zf}
" zj/zk/za
" 打开已折叠代码块:zo
" 关闭折叠:zc
" ------------------------------------------------------------------------------
set foldenable
set foldlevelstart=99
set foldnestmax=1
set foldmethod=manual
"set foldcolumn=1
"set foldmethod=syntax
set foldmarker={{,}}} " 折叠标志

set noswapfile
set nobackup
set undofile
set undodir=$HOME/.vim/undo
set history=1000
set autoread
set confirm
set modeline
set tags=tags,tagsx,..\tags
set autochdir  " 自动进入文件所在目录

" 文件类型与语法配置
filetype on               " 文件类型检测
filetype plugin on        " 根据不同类型的文件加载插件
filetype indent on
filetype plugin indent on
syntax on
syntax enable

" 默认缩进设置
set cindent 
set expandtab " tab 展开为空格
set tabstop=2 " tab 宽度
set shiftwidth=2 
set shiftround
set softtabstop=2
set noautoindent
"set autoindent    " 自动缩进 set noautoindent 取消自动缩进
set smarttab
set smartindent   " 智能缩进

" 查找搜索
set showmatch
set matchtime=1
set hlsearch 
set incsearch    " 实时搜索功能
set ignorecase   " 搜索时大小写不敏感


" ------------------------------------------------------------------------------
let Tlist_Auto_Open=1 
let Tlist_Ctags_Cmd='/usr/bin/ctags'
let Tlist_Show_One_File=1
let Tlist_Exit_OnlyWindow=1
let Tlist_Use_Right_Window=1

" vim-javascript
let g:javascript_plugin_jsdoc = 1
let javascript_enable_domhtmlcss = 1
let g:javascript_plugin_ngdoc = 1
let g:javascript_plugin_flow = 1
let g:ft_ignore_pat = '\.\(Z\|gz\|bz2\|zip\|tgz\)$'

" ------------------------------------------------------------------------------
" netrw configurations
" ------------------------------------------------------------------------------
let g:netrw_autoupdate = 1
" let g:loaded_netrw = 1
" let g:loaded_netrwPlugin = 1
" let g:netrw_winsize = 25 " 设置窗口宽度为25%
let g:netrw_usetab = 1
let g:netrw_banner = 0
let g:netrw_liststyle = 0
let g:netrw_browse_split = 4 " 0 当前窗口 1 水平 2 垂直 3 新标签页 4 前一个窗口
let g:netrw_altv = 1  " 水平分割时显示在左
let g:netrw_bufsettings = 'noma nomod nu nobl nowrap ro nornu'
let g:netrw_keepdir = 0 " keep current dir the same as the browsing dir
" let b:netrw_curdir
let g:netrw_menu = 1
let g:netrw_list_hide='.*\(^\.git\),.DS_Store' " hide dot files
let g:netrw_hide=1 " 0 show all =1 show not-hidden files
let g:netrw_theme = "dark"
let g:netrw_use_devicons = 1
autocmd FileType netrw setlocal bufhidden=delete

" ------------------------------------------------------------------------------
" 自定义函数
" ------------------------------------------------------------------------------

" Theme配置项目 "
function! SetTheme()

  set background=light

  let Now=strftime("%H") " 获取当前时间

  if Now > 6 && Now < 23
    "set background=light
  else
    "set background=dark
  endif

  if &background == "light"
    "hi Normal  ctermfg=Black ctermbg=LightYellow
    hi Comment ctermfg=DarkGrey ctermbg=None guifg=DarkGrey
    hi StatusLine ctermfg=LightGray ctermbg=DarkBlue
  endif

  if &background == "dark"
    "hi Normal ctermfg=LightCyan ctermbg=0
    hi Comment ctermfg=white ctermbg=None font='Monospace 16'
    hi StatusLine ctermfg=blue ctermbg=DarkRed
  endif

endfunction

" ------------------------------------------------------------------------------
" 设置头
" ------------------------------------------------------------------------------
func! SetHeader()
  if expand("%:e") == 'sh' 
        call setline(1,"#!/bin/sh")
        call setline(2,"#")
        call setline(3,"#********************************************************************")
        call setline(4,"#Date:         ".strftime("%Y-%m-%d"))
        call setline(5,"#FileName：      ".expand("%"))
        call setline(6,"#********************************************************************")
        call setline(7,"")
      endif
endfunc

" ------------------------------------------------------------------------------
"
" ------------------------------------------------------------------------------
func SetComment()
     call setline(1,"/*==================================")
     call append(line("."),   "*   Copyright (C) ".strftime("%Y")." All rights reserved.")
     call append(line(".")+1, "*   ")
     call append(line(".")+2, "*   文件名称：".expand("%:t"))
     call append(line(".")+3, "*   创 建 者：herb")
     call append(line(".")+4, "*   创建日期：".strftime("%Y年%m月%d日"))
     call append(line(".")+5, "*   描    述：")
     call append(line(".")+6, "*")
     call append(line(".")+7, "================================================================*/")
 endfunc

" ------------------------------------------------------------------------------
"  进入vim时执行的任务
" ------------------------------------------------------------------------------
function! EnterVim ()
  if argc() == 0 || isdirectory(argv(0))
    " :Vexplore
    " :edit README.md
    :E
    :vsp
    ":wincmd w
  endif
endfunction

" ------------------------------------------------------------------------------
" 自动编译并执行 
" ------------------------------------------------------------------------------
function! CompileAndExec ()
  if &filetype == "c"
    " %< 代表当前文件不含扩展名
    "exec "!gcc % -o %<"
    exec "!gcc % -o %<.out"
    exec "!./%<.out"
  endif
endfunction

" ------------------------------------------------------------------------------
"
" ------------------------------------------------------------------------------
function! EnterReadme ()
  if filereadable('README.md')
    let current_file = expand('%:p')
    let alternate_file = expand('%:p:h') . '/README.md'
    if current_file != alternate_file
      let b:keep_alt_file_open = 1
      exe 'keepalt b ' . alternate_file
      silent edit README.md
      endif
  endif
endfunction

" ------------------------------------------------------------------------------
"
" 
" ------------------------------------------------------------------------------
function! LeaveVim ()
  if exists('b:keep_alt_file_open') && b:keep_alt_file_open
    let b:keep_alt_file_open = 0
    wincmd p
    silent! edit #
  endif
endfunction

" ------------------------------------------------------------------------------
" 保存后执行的Action
" ------------------------------------------------------------------------------
function! WritePostActions ()  
  :call system("ctags -R")
  " :echomsg "document saved."
  "
endfunction


" ------------------------------------------------------------------------------
" toggle syntax 
" ------------------------------------------------------------------------------
function! ToggleSyntax()
    if exists('g:syntax_on') && g:syntax_on
        set syntax=off
        let g:syntax_on = 0
    else
        set syntax=on
        let g:syntax_on = 1
    endif
endfunction

" ============================================================================== 
" 自动执行
" ============================================================================== 
" c脚本配置
autocmd BufRead *.c set cindent             "C/C++缩进方式
"autocmd FileType c noremap <buffer> <F5> :!gcc % <CR>
autocmd FileType c noremap <buffer> <F5> :call CompileAndExec()<CR>
autocmd FileType cpp noremap <buffer> <F5> :!gcc % <CR>

" 文件类型配置
autocmd BufRead,BufNewFile *.md set filetype=markdown
autocmd BufRead,BufNewFile *.plist set filetype=xml

" shell脚本配置项目
autocmd BufNewFile *.sh exec ":call SetHeader()"
autocmd FileType sh noremap <buffer> <F5> :!/bin/bash % <CR>

" javascript configuration
"autocmd BufWinLeave *.mjs,*.cjs mkview
"autocmd BufWinEnter *.mjs,*.cjs silent loadview
"autocmd BufRead,BufNewFile *.cjs,*.mjs,*.js,*.jsx set filetype=javascript
autocmd FileType javascript noremap <buffer> <F5> :!NODE_ENV=development NODE_DEBUG=debug:* node --trace-warnings --experimental-sqlite % <CR>
autocmd FileType typescript noremap <buffer> <F5> :!NODE_ENV=development NODE_DEBUG=debug:* node --experimental-strip-types --experimental-sqlite --disable-warning=ExperimentalWarning --experimental-transform-types --trace-warnings % <CR>

" typescript configuration
"autocmd BufWinEnter,BufRead,BufNewFile *.mts set syntax=off
"autocmd FileType typescript setlocal syntax=OFF

" python脚本配置
autocmd Filetype python set fileformat=unix
autocmd Filetype python set foldmethod=indent
autocmd Filetype python set foldlevel=99
autocmd FileType python noremap <buffer> <F5> :!python3 % <CR>

" html配置
autocmd BufRead *.html,<&faf;HTML>  runtime! syntax/html.vim

" 进入Vim时执行的任务
autocmd VimEnter * silent! :call EnterVim()

"
autocmd BufWritePost $MYVIMRC source $MYVIMRC " 自动生效配置文件
autocmd BufWritePost * :call WritePostActions()

" 打开目录时自动检查并打开README
" autocmd BufReadPost * :call EnterReadme()
" autocmd VimLeave * :call LeaveVim()

" ------------------------------------------------------------------------------
" 键盘映射
" ------------------------------------------------------------------------------
nmap LB 0 " LB
nmap LE $ " LE

" 组合功能键
vmap <C-c> "+y
map <C-T> +gf
map <C-A> ggVGY
map! <C-A> <Esc>ggVGY
"nmap <c-v> "+gp
"nmap <c-c> "+y
"nmap <silent> <leader>fe :Sexplore!<CR> 
"
"map <Tab> :tabnext<CR>  " gt
"map <S-Tab> :tabpre<CR> " gT

"nnoremap <C-J> <C-W><C-J>
"nnoremap <C-K> <C-W><C-K>
"nnoremap <C-L> <C-W><C-L>
"nnoremap <C-H> <C-W><C-H>
nnoremap <leader>b :!open expand('<cWORD>')<CR>
nnoremap <C-h> :bprevious<CR>
nnoremap <C-l> :bnext<CR>

" 快捷键映射
"
nmap <special> <F1> :make!<CR>
"map <F2> :Vexplore<CR>
nnoremap <F2> :Explore<CR>
"map <F4> :call append(line('.'), strftime('%c'))<CR>
nnoremap <F6> :call ToggleSyntax()<CR>
