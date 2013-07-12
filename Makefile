#
# Clean/Compile Life-cycle
#

all: clean compile


clean:
	make -C _layouts clean
	rm -rf _site


compile:
	make -C _layouts
	bundle exec jekyll --no-server --no-safe --no-auto
	bundle exec compass compile -c compass.rb


runserver: clean compile
	bundle exec foreman start


.PHONY: all clean compile runserver

#
# Developer Setup
#

setup:
	sudo apt-get -y install python-pygments
	bundle install

.PHONY: setup
