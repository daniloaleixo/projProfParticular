#!/bin/bash




if [ "$1" == "all" ]; then
	protractor tests/e2e-tests.conf.js --verbose
	karma start tests/unit-tests.conf.js
elif [ "$1" == "unit" ]; then
	karma start tests/unit-tests.conf.js --verbose --colors
elif [ "$1" == "e2e" ]; then
	protractor tests/e2e-tests.conf.js --verbose
else
	echo "Você tem de entrar com um parâmetro válido"
fi



#if [ $1 = "all" ]; then
#	karma start tests/unit-tests.conf.js
#	protractor tests/e2e-tests.conf.js
#elif [ $1 = "unit"]; then 
#	karma start tests/unit-tests.conf.js
#elif [ $1 = "e2e"]; then
#	protractor tests/e2e-tests.conf.js
#else
#	echo "Você tem de entrar com um parâmetro válido"
#fi


