(function(Scratch) {
    'use strict';

    class AssetManager {
        constructor() {
            // İndirilen öğelerin kategorilere göre saklanması
            this.assets = {
                sprites: [],
                costumes: [],
                sounds: []
            };
        }

        getInfo() {
            return {
                id: 'assetmanager',
                name: 'Asset Manager',
                blocks: [
                    // URL veya yerelden öğe ekleme
                    {
                        opcode: 'addAsset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Add [TYPE] from [SOURCE] to project',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'assetTypes'
                            },
                            SOURCE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com/asset.png'
                            }
                        }
                    },
                    // Öğeyi yeniden adlandırma
                    {
                        opcode: 'renameAsset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Rename [TYPE] at index [INDEX] to [NEWNAME]',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'assetTypes'
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            NEWNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'NewName'
                            }
                        }
                    },
                    // Öğeyi silme
                    {
                        opcode: 'deleteAsset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Delete [TYPE] at index [INDEX]',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'assetTypes'
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    // Öğenin sırasını değiştirme
                    {
                        opcode: 'reorderAsset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Move [TYPE] from index [OLDINDEX] to [NEWINDEX]',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'assetTypes'
                            },
                            OLDINDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            NEWINDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    }
                ],
                menus: {
                    assetTypes: {
                        items: ['sprites', 'costumes', 'sounds']
                    }
                }
            };
        }

        // URL veya yerelden proje öğesi ekleme
        addAsset({ TYPE, SOURCE }) {
            if (!this.assets[TYPE]) return;
            const newIndex = this.assets[TYPE].length + 1;
            this.assets[TYPE].push({ name: `${TYPE}${newIndex}`, source: SOURCE });
            console.log(`Added ${TYPE} from ${SOURCE}.`);
        }

        // Öğeyi yeniden adlandırma
        renameAsset({ TYPE, INDEX, NEWNAME }) {
            if (!this.assets[TYPE] || !this.assets[TYPE][INDEX - 1]) return;
            this.assets[TYPE][INDEX - 1].name = NEWNAME;
            console.log(`Renamed ${TYPE} at index ${INDEX} to ${NEWNAME}.`);
        }

        // Öğeyi silme
        deleteAsset({ TYPE, INDEX }) {
            if (!this.assets[TYPE] || !this.assets[TYPE][INDEX - 1]) return;
            this.assets[TYPE].splice(INDEX - 1, 1);
            console.log(`Deleted ${TYPE} at index ${INDEX}.`);
        }

        // Öğenin sırasını değiştirme
        reorderAsset({ TYPE, OLDINDEX, NEWINDEX }) {
            if (!this.assets[TYPE] || !this.assets[TYPE][OLDINDEX - 1] || this.assets[TYPE][NEWINDEX - 1]) return;
            const item = this.assets[TYPE].splice(OLDINDEX - 1, 1)[0];
            this.assets[TYPE].splice(NEWINDEX - 1, 0, item);
            console.log(`Moved ${TYPE} from index ${OLDINDEX} to ${NEWINDEX}.`);
        }
    }

    Scratch.extensions.register(new AssetManager());
})(Scratch);
