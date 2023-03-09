import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extensionForMarkGrade.openPage',
		() => {
			const panel = vscode.window.createWebviewPanel(
				'helloWebView', // Identifies the type of the webview. Used internally
				'成绩批改', // Title of the panel displayed to the user
				vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
				{
					enableScripts: true
				} // Webview options. More on these later.
			);
			vscode.workspace.onDidOpenTextDocument((e) => {
				console.log(e);
			});
			vscode.workspace.onDidChangeTextDocument((e) => {
				console.log('changed');
				console.log(e);
			});
			// console.log(vscode.workspace.workspaceFolders);
			panel.webview.html = getWebviewContent(vscode.workspace.textDocuments[0].uri.path);
		});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

function getWebviewContent(item: string): string {
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
			<div>
			<div>
				${item}
			</div>
				<div>
					批改
				</div>
				<div>
					<div>
						学生具体信息:
					</div>
					<div>
						<ul>
							<li>
								姓名:张三
							</li>
							<li>
								学校:武汉大学
							</li>
							<li>
								培训批次：2023秋季
							</li>
						</ul>
					</div>
					<div>
						成绩:<input/><button>提交</button>
					</div>
				</div>
			</div>
		</body>
	</html>`;
}
