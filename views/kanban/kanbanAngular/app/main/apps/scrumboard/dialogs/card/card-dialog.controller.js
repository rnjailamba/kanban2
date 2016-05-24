(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('ScrumboardCardDialogController', ScrumboardCardDialogController);

    /** @ngInject */
    function ScrumboardCardDialogController($document, $mdDialog, fuseTheming, fuseGenerator,
                                                  msUtils, BoardService, cardId, DialogService, FileUploader)
    {
        var vm = this;

        // Data
        vm.board = BoardService.data;
        vm.card = vm.board.cards.getById(cardId);
        vm.cardId = cardId;
        vm.newLabelColor = 'red';
        vm.members = vm.board.members;
        vm.labels = vm.board.labels;

        // Methods
        vm.palettes = fuseTheming.getRegisteredPalettes();
        vm.rgba = fuseGenerator.rgba;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;
        vm.closeDialog = closeDialog;
        vm.finish = finish;
        vm.finishNew = finishNew;
        vm.getCardList = getCardList;
        vm.removeCard = removeCard;
        /* Attachment */
        vm.toggleCoverImage = toggleCoverImage;
        vm.removeAttachment = removeAttachment;
        /* Labels */
        vm.labelQuerySearch = labelQuerySearch;
        vm.filterLabel = filterLabel;
        vm.addNewLabel = addNewLabel;
        vm.removeLabel = removeLabel;
        /* Members */
        vm.memberQuerySearch = memberQuerySearch;
        vm.filterMember = filterMember;
        /* Checklist */
        vm.updateCheckedCount = updateCheckedCount;
        vm.addCheckItem = addCheckItem;
        vm.removeChecklist = removeChecklist;
        vm.createCheckList = createCheckList;
        /* Comment */
        vm.addNewComment = addNewComment;

        vm.openDynamicCardDialog = DialogService.openDynamicCardDialog;

        var uploader = vm.uploader = new FileUploader({
            url: "https://cementifyblogimages.s3-ap-southeast-1.amazonaws.com/1464061376758.jpg?AWSAccessKeyId=AKIAJ2QOR4DTCUFS6NFQ&Content-Type=image%3Bcharset%3DUTF-8&Expires=1470061376&Signature=elnB0JVQrW2ANB67MdY%2F%2BmrgOOA%3D&x-amz-acl=public-read",
            queueLimit:2,
            autoUpload:true,
            method:"put",
            disableMultipart: true,
            headers: {'Content-Type': 'image;charset=UTF-8'}
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                console.log(type);
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        /* Show tooltip */
        $timeout(function(){
          vm.showTooltipStartDate = true;
          vm.showTooltipDueDate = true;
        }, 500);

        //////////

        /**
         * Close Dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }


        /**
         * Save Dialog
         */
        function finish()
        {
            // console.log("in finish");
            $mdDialog.hide();

        }


        /**
         * Save Dialog
         */
        function finishNew()
        {
            console.log("in finish new");

        }

        /**
         * Get Card List
         */
        function getCardList()
        {
            var response;
            for ( var i = 0, len = vm.board.lists.length; i < len; i++ )
            {
                if ( vm.board.lists[i].idCards.indexOf(vm.card.id) > -1 )
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
        function removeCard(ev)
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

            $mdDialog.show(confirm).then(function ()
            {
                var cardList = getCardList();

                cardList.idCards.splice(cardList.idCards.indexOf(vm.card.id), 1);

                vm.board.cards.splice(vm.board.cards.indexOf(vm.card), 1);

            }, function ()
            {
                // Canceled
            });
        }

        /**
         * Toggle cover image
         *
         * @param attachmentId
         */
        function toggleCoverImage(attachmentId)
        {
            if ( attachmentId === vm.card.idAttachmentCover )
            {
                vm.card.idAttachmentCover = null;
            }
            else
            {
                vm.card.idAttachmentCover = attachmentId;
            }
        }

        /**
         * Remove attachment
         *
         * @param item
         */
        function removeAttachment(item)
        {
            if ( vm.card.idAttachmentCover === item.id )
            {
                vm.card.idAttachmentCover = '';
            }
            vm.card.attachments.splice(vm.card.attachments.indexOf(item), 1);
        }

        /**
         * Add label chips
         *
         * @param query
         * @returns {filterFn}
         */
        function labelQuerySearch(query)
        {
            return query ? vm.labels.filter(createFilterFor(query)) : [];
        }

        /**
         * Label filter
         *
         * @param label
         * @returns {boolean}
         */
        function filterLabel(label)
        {
            if ( !vm.labelSearchText || vm.labelSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(label.name).indexOf(angular.lowercase(vm.labelSearchText)) >= 0;
        }

        /**
         * Add new label
         */
        function addNewLabel()
        {
            vm.board.labels.push({
                id   : msUtils.guidGenerator(),
                name : vm.newLabelName,
                color: vm.newLabelColor
            });

            vm.newLabelName = '';
        }

        /**
         * Remove label
         */
        function removeLabel()
        {
            var arr = vm.board.labels;
            arr.splice(arr.indexOf(arr.getById(vm.editLabelId)), 1);

            angular.forEach(vm.board.cards, function (card)
            {
                if ( card.idLabels && card.idLabels.indexOf(vm.editLabelId) > -1 )
                {
                    card.idLabels.splice(card.idLabels.indexOf(vm.editLabelId), 1);
                }
            });

            vm.newLabelName = '';
        }

        /**
         * Add member chips
         *
         * @param query
         * @returns {Array}
         */
        function memberQuerySearch(query)
        {
            return query ? vm.members.filter(createFilterFor(query)) : [];
        }

        /**
         * Member filter
         *
         * @param member
         * @returns {boolean}
         */
        function filterMember(member)
        {
            if ( !vm.memberSearchText || vm.memberSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(member.name).indexOf(angular.lowercase(vm.memberSearchText)) >= 0;
        }

        /**
         * Update check list stats
         * @param list
         */
        function updateCheckedCount(list)
        {
            var checkItems = list.checkItems;
            var checkedItems = 0;
            var allCheckedItems = 0;
            var allCheckItems = 0;

            angular.forEach(checkItems, function (checkItem)
            {
                if ( checkItem.checked )
                {
                    checkedItems++;
                }
            });

            list.checkItemsChecked = checkedItems;

            angular.forEach(vm.card.checklists, function (item)
            {
                allCheckItems += item.checkItems.length;
                allCheckedItems += item.checkItemsChecked;
            });

            vm.card.checkItems = allCheckItems;
            vm.card.checkItemsChecked = allCheckedItems;
        }

        /**
         * Add checklist item
         *
         * @param text
         * @param checkList
         */
        function addCheckItem(text, checkList)
        {
            if ( !text || text === '' )
            {
                return;
            }

            var newCheckItem = {
                'name'   : text,
                'checked': false
            };

            checkList.checkItems.push(newCheckItem);

            updateCheckedCount(checkList);
        }

        /**
         * Remove checklist
         *
         * @param item
         */
        function removeChecklist(item)
        {
            vm.card.checklists.splice(vm.card.checklists.indexOf(item), 1);

            angular.forEach(vm.card.checklists, function (list)
            {
                updateCheckedCount(list);
            });
        }

        /**
         * Create checklist
         */
        function createCheckList()
        {
            vm.card.checklists.push({
                id               : msUtils.guidGenerator(),
                name             : vm.newCheckListTitle,
                checkItemsChecked: 0,
                checkItems       : []
            });

            vm.newCheckListTitle = '';
        }

        /**
         * Add new comment
         *
         * @param newCommentText
         */
        function addNewComment(newCommentText)
        {
            var newComment = {
                idMember: '36027j1930450d8bf7b10158',
                message : newCommentText,
                time    : 'now'
            };

            vm.card.comments.unshift(newComment);
        }

        /**
         * Filter for chips
         *
         * @param query
         * @returns {filterFn}
         */
        function createFilterFor(query)
        {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item)
            {
                return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
            };
        }
    }
})();
