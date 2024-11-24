# ##############################################################################
#
# Makefile
#
# ##############################################################################
#
# 环境变量
NAME="ERPS"
_PWD  := $(shell pwd)
SHELL := /bin/bash
PATH  :=  ${PATH}:${_PWD}/bin:${_PWD}/node_modules/.bin

#ifeq ($(CC),gcc)
  # libs=$(libs_for_gcc)
#else
  # libs=$(normal_libs)
#endif

# 源码类别
SOURCES   = $(wildcard *.c *.cc)
OBJS      = $(patsubst %.c,%.o,$(patsubst %.cc,%.o,$(SOURCES)))
gql_files = $(shell find ./src/schema -name '*.gql')
mts_files = $(shell find ./src -name '*.mts')
dt_files  = $(shell find ./ -name "*.d.mts")
ds_files  = $(shell find ./ -name ".DS_Store")

# myprog : $(OBJS)gcc -o myprog $(OBJS)

install: ;@echo "Installing ${NAME}....."; \
	npm install
	@ln -sf ${_PWD}/.vimrc ~/.vimrc

build_css:
	@echo "开始构建CSS style....."

test_build:
	@# 测试	

test_var:
	@echo ${ds_files}

clean_obj:
	rm -f *.o

clean_diff:
	rm -f *.diff

clean_dt: $(dt_files)
	rm $?

clean_ds: $(ds_files)
	rm $?

clean:
	@rm -rf build
	@rm -f .config.json
	@echo "清理目录"
