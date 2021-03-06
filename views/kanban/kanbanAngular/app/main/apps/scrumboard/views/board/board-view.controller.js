(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('BoardViewController', BoardViewController);

    /** @ngInject */
    function BoardViewController($document, $window, $timeout, $mdDialog, msUtils, BoardList,
                                    BoardService, CardFilters, DialogService)
    {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.board = BoardService.data;
        console.log("vm.board", vm.board);
        // vm.board.lists.push({name:"Current",id:"2223232"});
        // console.log("vm.board.lists", vm.board.lists);

        vm.boardList = BoardList.data;
        vm.cardFilters = CardFilters;
        vm.card = {};
        vm.cardOptions = {};
        vm.newListName = '';
        vm.sortableListOptions = {
            axis       : 'x',
            delay      : 75,
            distance   : 7,
            items      : '> .list-wrapper',
            handle     : '.list-header',
            placeholder: 'list-wrapper list-sortable-placeholder',
            tolerance  : 'pointer',
            start      : function (event, ui)
            {
                var width = ui.item[0].children[0].clientWidth;
                var height = ui.item[0].children[0].clientHeight;
                ui.placeholder.css({
                    'min-width': width + 'px',
                    'width'    : width + 'px',
                    'height'   : height + 'px'
                });
            }
        };
        vm.sortableCardOptions = {
            appendTo            : 'body',
            connectWith         : '.list-cards',
            delay               : 75,
            distance            : 7,
            forceHelperSize     : true,
            forcePlaceholderSize: true,
            handle              : msUtils.isMobile() ? '.list-card-sort-handle' : false,
            helper              : function (event, el)
            {
                return el.clone().addClass('list-card-sort-helper');
            },
            placeholder         : 'list-card card-sortable-placeholder',
            tolerance           : 'pointer',
            scroll              : true,
            sort                : function (event, ui)
            {
                var listContentEl = ui.placeholder.closest('.list-content');
                var boardContentEl = ui.placeholder.closest('#board');

                if ( listContentEl )
                {
                    var listContentElHeight = listContentEl[0].clientHeight,
                        listContentElScrollHeight = listContentEl[0].scrollHeight;

                    if ( listContentElHeight !== listContentElScrollHeight )
                    {
                        var itemTop = ui.position.top,
                            itemBottom = itemTop + ui.item.height(),
                            listTop = listContentEl.offset().top,
                            listBottom = listTop + listContentElHeight;

                        if ( itemTop < listTop + 25 )
                        {
                            listContentEl.scrollTop(listContentEl.scrollTop() - 25);
                        }

                        if ( itemBottom > listBottom - 25 )
                        {
                            listContentEl.scrollTop(listContentEl.scrollTop() + 25);
                        }
                    }
                }

                if ( boardContentEl )
                {
                    var boardContentElWidth = boardContentEl[0].clientWidth;
                    var boardContentElScrollWidth = boardContentEl[0].scrollWidth;

                    if ( boardContentElWidth !== boardContentElScrollWidth )
                    {
                        var itemLeft = ui.position.left,
                            itemRight = itemLeft + ui.item.width(),
                            boardLeft = boardContentEl.offset().left,
                            boardRight = boardLeft + boardContentElWidth;

                        if ( itemLeft < boardLeft + 25 )
                        {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() - 25);
                        }

                        if ( itemRight > boardRight )
                        {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() + 25);
                        }
                    }
                }
            }
        };

        // Methods
        vm.openCardDialog = DialogService.openCardDialog;
        vm.addNewList = addNewList;
        vm.removeList = removeList;
        vm.cardFilter = cardFilter;
        vm.isOverdue = isOverdue;
        vm.removeCard = removeCard;
        vm.moveCurrent = moveCurrent;
        vm.moveBacklog = moveBacklog;
        vm.moveFuture = moveFuture;
        vm.moveDone = moveDone;

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {

            $timeout(function ()
            {
                // IE list-content max-height hack
                if ( angular.element('html').hasClass('explorer') )
                {
                    // Calculate the height for the first time
                    calculateListContentHeight();

                    // Attach calculateListContentHeight function to window resize
                    $window.onresize = function ()
                    {
                        calculateListContentHeight();
                    };
                }
            }, 0);

        }

        /**
         * Add New Card To A List
         */
        function addNewCard(listName,cardId,card)
        {
            var cards = vm.board.cards;
            var newCardId = msUtils.guidGenerator();
            // console.log(card,"card");
            cards.push(card);
            var list = vm.board.lists.getByName(listName);
            list.idCards.push(card.id);
            // console.log("vm.board after add", vm.board);

        }

        /**
         * Move Current
         *
         * @param ev
         */
        function moveCurrent(ev,cardId,listId)
        {
          // console.log("in move current", cardId, " ", listId);
          var cards = vm.board.cards;
          var card = cards.getById(cardId);
          removeCardWithoutWarning("",cardId);
          $timeout(function ()
          {
            addNewCard("Current",cardId,card);

          },1);
        }

        /**
         * Move Backlog
         *
         * @param ev
         */
        function moveBacklog(ev,cardId,listId)
        {
          var cards = vm.board.cards;
          var card = cards.getById(cardId);
          removeCardWithoutWarning("",cardId);
          $timeout(function ()
          {
            addNewCard("Backlog",cardId,card);

          },1);
        }

        /**
         * Move Future
         *
         * @param ev
         */
        function moveFuture(ev,cardId,listId)
        {
          var cards = vm.board.cards;
          var card = cards.getById(cardId);
          removeCardWithoutWarning("",cardId);

          $timeout(function ()
          {
            addNewCard("Future",cardId,card);

          },1);
        }

        /**
         * Move Done
         *
         * @param ev
         */
        function moveDone(ev,cardId,listId)
        {
          var cards = vm.board.cards;
          var card = cards.getById(cardId);
          removeCardWithoutWarning("",cardId);
          $timeout(function ()
          {
            addNewCard("Done",cardId,card);

          },1);
        }

        /**
         * IE ONLY
         * Calculate the list-content height
         * IE ONLY
         */
        function calculateListContentHeight()
        {
            var boardEl = angular.element('#board');
            var boardElHeight = boardEl.height();

            boardEl.find('.list-wrapper').each(function (index, el)
            {
                // Get the required heights for calculations
                var listWrapperEl = angular.element(el),
                    listHeaderElHeight = listWrapperEl.find('.list-header').height(),
                    listFooterElHeight = listWrapperEl.find('.list-footer').height();

                // Calculate the max height
                var maxHeight = boardElHeight - listHeaderElHeight - listFooterElHeight;

                // Add the max height
                listWrapperEl.find('.list-content').css({'max-height': maxHeight});
            });
        }

        /**
         * Get Card List
         */
        function getCardList(cardId)
        {
          // console.log("in getCardList of bvc",vm.board.lists.length);

            var response;
            for ( var i = 0, len = vm.board.lists.length; i < len; i++ )
            {
                if ( vm.board.lists[i].idCards.indexOf(cardId) > -1 )
                {
                    response = vm.board.lists[i];
                    break;
                }
            }
            return response;
        }

        /**
         * Remove card
         *
         * @param ev
         */
        function removeCard(ev,cardId)
        {
            console.log("in remove card of bvc");
            var confirm = $mdDialog.confirm({
                title              : 'Remove Card',
                parent             : $document.find('#scrumboard'),
                textContent        : 'Are you sure want to remove card?',
                ariaLabel          : 'remove card',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });

            $mdDialog.show(confirm).then(function ()
            {
                var cardList = getCardList(cardId);

                cardList.idCards.splice(cardList.idCards.indexOf(cardId), 1);

                vm.board.cards.splice(vm.board.cards.indexOf(vm.board.cards.getById(cardId)), 1);
                // console.log("vm.board after remove", vm.board);


            }, function ()
            {
                // Canceled
            });

        }

        /**
         * Remove card without warning
         *
         * @param ev
         */
        function removeCardWithoutWarning(ev,cardId)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Remove Card',
                parent             : $document.find('#scrumboard'),
                textContent        : 'Are you sure want to remove card?',
                ariaLabel          : 'remove card',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });


            var cardList = getCardList(cardId);

            cardList.idCards.splice(cardList.idCards.indexOf(cardId), 1);

            vm.board.cards.splice(vm.board.cards.indexOf(vm.board.cards.getById(cardId)), 1);
            console.log("vm.board after remove", vm.board);


        }

        /**
         * Add new list
         */
        function addNewList()
        {
            if ( vm.newListName === '' )
            {
                return;
            }

            vm.board.lists.push({
                id     : msUtils.guidGenerator(),
                name   : vm.newListName,
                idCards: []
            });

            vm.newListName = '';
        }

        /**
         * Remove list
         *
         * @param ev
         * @param list
         */
        function removeList(ev, list)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Remove List',
                parent             : $document.find('#scrumboard'),
                textContent        : 'Are you sure want to remove list?',
                ariaLabel          : 'remove list',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });
            $mdDialog.show(confirm).then(function ()
            {
                vm.board.lists.splice(vm.board.lists.indexOf(list), 1);
            }, function ()
            {
                // Canceled
            });

        }

        /**
         * Card filter
         *
         * @param cardId
         * @returns {*}
         */
        function cardFilter(cardId)
        {
            var card = vm.board.cards.getById(cardId);

            try
            {
                if ( angular.lowercase(card.name).indexOf(angular.lowercase(vm.cardFilters.name)) < 0 )
                {
                    throw false;
                }

                angular.forEach(vm.cardFilters.labels, function (label)
                {
                    if ( !msUtils.exists(label, card.idLabels) )
                    {
                        throw false;
                    }
                });

                angular.forEach(vm.cardFilters.members, function (member)
                {
                    if ( !msUtils.exists(member, card.idMembers) )
                    {
                        throw false;
                    }
                });


            } catch ( err )
            {
                return err;
            }

            return true;
        }

        /**
         * Is the card overdue?
         *
         * @param cardDate
         * @returns {boolean}
         */
        function isOverdue(cardDate)
        {
            return moment() > moment(cardDate, 'x');
        }
    }
})();
