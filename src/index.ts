import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IFileBrowserFactory
} from '@jupyterlab/filebrowser';

import {
  IDocumentManager,
  getOpenPath
} from '@jupyterlab/docmanager';

import {
  ICommandPalette,
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  Drive
} from '@jupyterlab/services';

import '../style/index.css';


/**
 * Volume filebrowser plugin state namespace
 */
const NAMESPACE = 'volume-filebrowser';


/**
 * The JupyterLab plugin for a Volume file browser
 */
const fileBrowserPlugin: JupyterLabPlugin<void> = {
  id: '@sesync/volume:drive',
  requires: [
    IDocumentManager,
    IFileBrowserFactory,
    ICommandPalette
  ],
  autoStart: true,
  activate: activateFileBrowser
};


/**
 * provide command to open a Volume file browser
 */
function activateFileBrowser(
  app: JupyterLab,
  manager: IDocumentManager,
  factory: IFileBrowserFactory,
  palette: ICommandPalette
): void {

  // add application command to open a file browser
  const command: string = NAMESPACE + ':open';
  app.commands.addCommand(command, {
    label: 'Browse At Path...',
    execute: () => {
      const { commands } = app;

      // get path from user input
      const path = getOpenPath(manager.services.contents);
      path.then(path => {console.log(path)}); //FIXME
      
      // add the Volume backend to the contents manager
      const drive = new Drive();
      manager.services.contents.addDrive(drive);

      // create a new file browser
      const browser = factory.createFileBrowser(NAMESPACE, {
        commands,
        driveName: drive.name
      });
      
      // add a toolbar button to close the browser
      const closer = new ToolbarButton({
        iconClassName: 'jp-CloseIcon jp-Icon jp-Icon-16',
        onClick: () => {browser.dispose()},
        tooltip: 'Close File Browser'
      });
      browser.toolbar.addItem('closer', closer);

      // customize browser display
      browser.title.iconClass = 'jp-FolderIcon jp-SideBar-tabIcon';
      browser.title.caption = 'Browse Volume';

      // add browser to left sidebar
      app.shell.addToLeftArea(browser, { rank: 102 });
    }
  });

  // add the command to the palette
  palette.addItem({command, category: 'File Operations'});
}

export default fileBrowserPlugin;
