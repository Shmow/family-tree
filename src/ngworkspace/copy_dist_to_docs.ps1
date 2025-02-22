[string]$sourceDirectory  = ".\dist\family-tree\browser\*"
[string]$destinationDirectory = "..\..\docs"

Write-Host "Cleaning $destinationDirectory.."
Get-ChildItem $destinationDirectory | Remove-Item -recurse -Force

Write-Host "Copying $sourceDirectory to $destinationDirectory.."
Copy-item -Force -Recurse -Verbose $sourceDirectory -Destination $destinationDirectory

New-Item "$destinationDirectory\.nojekyll" -Type file
Copy-Item "$destinationDirectory\index.html" "$destinationDirectory\404.html"